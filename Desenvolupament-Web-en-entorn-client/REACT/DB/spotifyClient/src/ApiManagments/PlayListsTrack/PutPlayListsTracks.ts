import type { GetPlayListsTracks } from "./interface/PlayListsTracks";

export async function PutPlayListTrack(newPlayListTrack: GetPlayListsTracks, id: string) {
    const response: Response = await fetch(
        `http://localhost:3000/playListTracks/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPlayListTrack),
        })
}