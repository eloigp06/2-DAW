
import { Artist } from "../interfaces/artist/artist";
import { COUNTRIES, MAXARTIST, MAXREALNAME } from "../interfaces/artist/artist.constant";

export function isValidArtist(artist: Artist): boolean | string | undefined {

    if(!artist){
        return false;
    }
    if (!artist.artist || !artist.realName || !artist.country) {
        return false
    }

    const longArtist: number = artist.artist.trim().replace(/\s+/g, "").length;
    const longRealName: number = artist.realName.trim().replace(/\s+/g, "").length;

    return longArtist > 0
        && longArtist <= MAXARTIST
        && longRealName > 0
        && longRealName <= MAXREALNAME
        && COUNTRIES.find((p: string) => p.toLowerCase() === artist.country.trim().replace(/\s+/g, " ").toLowerCase()) !== undefined;
}

export function getCanonicalCountry(country: string): string {
    return COUNTRIES.find((p: string) => p.toLowerCase() === country.trim().replace(/\s+/g, " ").toLowerCase()) as string;
}