import { useEffect, useState } from "react"
import ListSongs from "../../Components/Songs/ListSongs"
import type { GetTrack } from "../../ApiManagments/Tracks/Interfaces/Track";
import { ENV } from "../../Config/env";
import AddSongFrom from "../../Components/Songs/AddSongFrom";
import type { FormState } from "./Types/FormState";
import type { Track } from "../../Model/Track";
import type { TrackCreate } from "../../ApiManagments/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../ApiManagments/Tracks/PostTrack";
import { PutTrack } from "../../ApiManagments/Tracks/PutTrack";

const SongManagment = () => {
    const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [newSong, setNewSong] = useState<FormState>({ mode: "none" });

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
        setNewSong({ mode: "new" });
    }

    function edit(t: Track) {
        setNewSong(
            {
                mode: "edit",
                song: t
            }
        );
    }

    async function save(t: TrackCreate) {
        await PostTrack(t);
        await carregarDadesTrack();
        setNewSong({ mode: "none" });
    }

    async function update(t: TrackCreate) {
        const id= newSong.mode==="edit"?newSong.song.id:"";
        await PutTrack(t, id);
        await carregarDadesTrack();
        setNewSong({ mode: "none" });
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
                                    <ListSongs tracks={tracks} edit={edit} />
                                </tbody>
                            </table>
                            : <p>No tracks avalible</p>
                    }
                </div>
            </main>
            {
                newSong.mode === "new" ?
                    <AddSongFrom submit={(t) => save(t)} />
                    : newSong.mode === "edit" ?
                        <AddSongFrom submit={(t) => update(t)} song={ newSong.song} />
                        : <button onClick={addSong}>Nova</button>
            }
        </>
    )
}
export default SongManagment