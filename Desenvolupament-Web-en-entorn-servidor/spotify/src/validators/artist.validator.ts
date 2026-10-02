
import { Artist } from "../interfaces/track/artistBD";

export function isValidTrack(artist: Artist): boolean {
    let correcte: boolean = true;

    if (!artist.artist || !artist.realName || !artist.country) {
        return false
    }



    if (artist.artist.trim().length === 0 || artist.realName.trim().length === 0 || artist.country.trim().length === 0) {
        correcte = false;
    }
    return correcte
}