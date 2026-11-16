import { useEffect, useState } from "react";
import { ENV } from "../../Config/env";
import type { GETArtist } from "../../ApiManagments/Artist/interfaces/Artist";

const AddSongFrom = () => {
    const [artists, SetArtist] = useState<GETArtist[]>([]);

    async function carregarArtists() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
        const listArtists: GETArtist[] = await resposta.json() as GETArtist[];
        SetArtist(listArtists);

    }
    useEffect(
        () => {
            carregarArtists();
        }, []
    );
    return (
        <>
            <h1>Afegir canço</h1>
            <form>
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
                                    (a:GETArtist) => (
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