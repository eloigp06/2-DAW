import { useEffect, useState, type SubmitEvent } from "react";
import { ENV } from "../../Config/env";
import type { GETArtist } from "../../ApiManagments/Artist/interfaces/Artist";
import type { TrackCreate } from "../../ApiManagments/Tracks/Interfaces/TrackCreate";
import { data } from "react-router";
import { PostTrack } from "../../ApiManagments/Tracks/PostTrack";
import type { AddSongFromProps } from "./Types/AddSongFromProps";

const AddSongFrom = (props: AddSongFromProps) => {
    const [artists, SetArtist] = useState<GETArtist[]>([]);

    async function carregarArtists() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
        const listArtists: GETArtist[] = await resposta.json() as GETArtist[];
        console.log("Resposta da API:", listArtists);

        SetArtist(listArtists);

    }
    useEffect(
        () => {
            carregarArtists();
        }, []
    );
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const dades = new FormData(event.currentTarget);

        const song: TrackCreate = {
            title: String(dades.get("title") ?? "").trim(),
            artist: String(dades.get("artist") ?? ""),
            duration: Number(dades.get("duration"))
        }

        await PostTrack(song);
        dades.set("title", "");
        props.refreshSong();
    }
    return (
        <>
            <h1>Afegir canço</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Titol:
                        <input
                            type="text"
                            name="title"
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Duration:
                        <input
                            type="number"
                            name="duration"
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Artist:
                        <select name="artist">
                            {
                                artists.map(
                                    (a: GETArtist) => (
                                        <option key={a.id} value={a.id}> {a.name} </option>
                                    )
                                )
                            }

                        </select>
                        <button type="submit">Add</button>
                    </label>
                </p>
            </form>
        </>
    )
}
export default AddSongFrom