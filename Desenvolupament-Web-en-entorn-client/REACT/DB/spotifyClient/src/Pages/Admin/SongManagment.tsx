import { useEffect, useState } from "react"
import ListSongs from "../../Components/Songs/ListSongs"
import type { GetTrack } from "../../ApiManagments/Tracks/Interfaces/Track";
import { ENV } from "../../Config/env";
import AddSongFrom from "../../Components/Songs/AddSongFrom";

const SongManagment = () => {
    const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [newSong, setNewSong] = useState<boolean>();

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GetTrack[] = await resposta.json() as GetTrack[];
        setTracks(listTrack);
    }

    useEffect(
        () => {
            carregarDadesTrack();
        }, []
    );

    function addSong() {
        setNewSong(true);
    }
    return (
        <>
            <main>
                <div className="track-tables">
                    {
                        tracks.length > 0 ?
                            <table>
                                <thead>
                                    <title>ListSong</title>
                                </thead>
                                <tbody>
                                    <ListSongs tracks={tracks} />
                                </tbody>
                            </table>
                            : <p>No tracks avalible</p>
                    }
                    <button onClick={addSong}>Nova</button>
                </div>
            </main>
            {
                newSong ?
                <AddSongFrom />
                : <></>
            }
        </>
    )
}
export default SongManagment