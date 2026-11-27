import { useState, useEffect } from "react";
import type { AddHistory } from "../../ApiManagments/History/Intrefaces/HistoryCreate";
import type { GetTrack } from "../../ApiManagments/Tracks/Interfaces/Track";
import PlayCard from "../../Components/Playing/PlayCard";
import SongCard from "../../Components/Songs/SongCard";
import type { Like } from "../../Components/Songs/Types/Like";
import type { TrackView } from "../../Components/Songs/Types/TrackView";
import { ENV } from "../../Config/env";
import type { GetPlayList } from "../../ApiManagments/PlayLists/interface/PlayList";
import type { GetPlayListsTracks } from "../../ApiManagments/PlayListsTrack/interface/PlayListsTracks";
import PlayListCard from "../../Components/PlayListReproductor/PlayListCard";

const Play = () => {

    const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [volume, setVolume] = useState<number>(10);
    const [escolta] = useState(false);
    const [playingTitle, setIsPlaying] = useState<string | null>(null);
    const [playlistTracks, setPlaylistTracks] = useState<GetPlayListsTracks[]>([]);
    const [history, setHistory] = useState<{ title: string; date: string }[]>([]);
    const [playlists, setPlaylist] = useState<GetPlayList[]>([]);
    const [track, setTrack] = useState<TrackView>(() =>
    ({
        ...tracks[Math.floor(Math.random() * tracks.length)],
        "reproduccions": Math.floor(Math.random() * 1000),
        "likes": {
            "like": false,
            "totalLikes": 0
        }
    }
    ));


    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GetTrack[] = await resposta.json() as GetTrack[];
        setTracks(listTrack);
        if (listTrack.length > 0) {
            const initalTrack = listTrack[Math.floor(Math.random() * listTrack.length)];
            if (initalTrack) {
                setTrack({
                    ...initalTrack,
                    reproduccions: Math.floor(Math.random() * 1000),
                    likes: {
                        like: false,
                        totalLikes: 0,
                    },
                });
            }
        }
    }

    async function carregarDadesPlayList() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playLists`);
        const listPlayList: GetPlayList[] = await resposta.json() as GetPlayList[];
        setPlaylist(listPlayList);
    }

    async function carregarDadesPlayListsTracks() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playListTracks`);
        const listPlaylistTracks: GetPlayListsTracks[] = await resposta.json() as GetPlayListsTracks[];
        setPlaylistTracks(listPlaylistTracks);
    }

    useEffect(
        () => {
            carregarDadesTrack();
            carregarDadesPlayList();
            carregarDadesPlayListsTracks();
        }, []
    );



    async function incrementReproduction() {
        const tr = (prev: TrackView): TrackView => {
            return {
                ...prev,
                reproduccions: prev.reproduccions + 1,
            }
        }
        setTrack(tr);
        const newHistory: AddHistory = {
            user: "9ABFE5E0-3D0E-496E-BA03-626AB321C805",
            track: tracks[1].id
        }
        const response: Response = await fetch(
            'http://localhost:3000/tracks/user/history',
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newHistory),
            })
        if (!response.ok) {
            return false;
        }
        const result = await response.json();
        console.log(result);

    }

    function handleClickRandom() {
        const random = Math.floor(Math.random() * tracks.length);

        const trackRandom = (): TrackView => {
            return {
                ...tracks[random],
                "likes": {
                    "like": true,
                    "totalLikes": Math.floor(Math.random() * 10000)
                },
                "reproduccions": Math.floor(Math.random() * 10000)

            }
        }
        setTrack(trackRandom);
    }

    function gestionarLikes() {
        const tr = (prev: TrackView): TrackView => {

            let increment: number = 1;
            if (prev.likes.like) {
                increment = -1;
            }
            const likeObj: Like = {
                like: !prev.likes.like,
                totalLikes: prev.likes.totalLikes + increment
            }

            return {
                ...prev,
                "likes": likeObj
            }
        }
        setTrack(tr);
    }

    function resetLikesAndReproduccions() {
        const tr = (prev: TrackView): TrackView => {
            return {
                ...prev,
                reproduccions: 0,
                likes: {
                    like: false,
                    totalLikes: 0,
                }
            }
        };
        setTrack(tr)
    }

    function playNoPlay() {
        if (!track.id) {
            return;
        }
        setHistory((prevHistory) => [
            ...prevHistory,
            { title: track.title, date: new Date().toLocaleString('ca-ES') },
        ])
        incrementReproduction();
        setIsPlaying(track.title);
    }

    function VolumenDown() {
        if (volume > 0) {
            setVolume(volume - 1);
        }
    }

    function VolumenUp() {
        if (volume < 100) {
            setVolume(volume + 1);
        }
    }



    return (
        <>
            <main>
                <div className="track-tables">
                    <PlayListCard
                        playList={playlists}
                        playListTracks={playlistTracks}
                        tracks={tracks}
                        onPlay={(song) => {
                            setTrack({
                                ...song,
                                reproduccions: 0,
                                likes: { like: false, totalLikes: 0 },
                            });
                            setIsPlaying(song.title);
                        }}
                    />

                    <table>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={`${entry.date}-${index}`}>
                                    <td>{entry.title}</td>
                                    <td>{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <aside>

                    <header className="app-header">
                        <h1>SPOTIFY</h1>

                        <div className="controls">
                            <button type="button" onClick={handleClickRandom}>
                                Random
                            </button>
                        </div>
                    </header>

                    <SongCard
                        trackInfo={track}
                        play={playNoPlay}
                        like={() => gestionarLikes()}
                        reset={() => resetLikesAndReproduccions()}
                    />
                    <hr />
                    <PlayCard
                        volupeUp={() => VolumenUp()}
                        volumeDown={() => VolumenDown()}
                        volume={volume}
                        escolta={escolta}
                        title={track.title}
                        playingTitle={playingTitle}
                        stop={() => setIsPlaying(null)}

                    />
                </aside>

            </main>

        </>

    )
}

export default Play;