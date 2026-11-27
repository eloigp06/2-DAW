import { Link } from "react-router";
import { useEffect, useState } from "react";
import type { GetTrack } from "../../ApiManagments/Tracks/Interfaces/Track";
import { ENV } from "../../Config/env";
import PlayListCard from "../../Components/PlayListReproductor/PlayListCard";
import type { GetPlayList } from "../../ApiManagments/PlayLists/interface/PlayList";
import type { GetPlayListsTracks } from "../../ApiManagments/PlayListsTrack/interface/PlayListsTracks";
import type { TrackView } from "../../Components/Songs/Types/TrackView";

const PlayListPage = () => {
  const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [, setIsPlaying] = useState<string | null>(null);
    const [playlistTracks, setPlaylistTracks] = useState<GetPlayListsTracks[]>([]);
    const [playlists, setPlaylist] = useState<GetPlayList[]>([]);
    const [, setTrack] = useState<TrackView>(() =>
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
    return (
        <>
            <h1>PlayLists</h1>
            <form >
                <button>
                    <Link to="/Play"> Menu </Link>

                </button>
                <button>
                    <Link to="/HisyotyPage"> Historial </Link>
                </button>
            </form>
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
                </div>
            </main>
        </>
    )
}

export default PlayListPage;