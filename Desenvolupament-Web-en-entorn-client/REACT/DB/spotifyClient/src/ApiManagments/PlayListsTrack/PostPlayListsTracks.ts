import type { GetPlayListsTracks } from "./interface/PlayListsTracks";

export async function PostPlayListsTracks(newPlayListTrack: GetPlayListsTracks) {
    const response: Response = await fetch(
        'http://localhost:3000/playListTracks/',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPlayListTrack),
        }
    )
}