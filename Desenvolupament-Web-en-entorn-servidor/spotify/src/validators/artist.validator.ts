
import { Artist } from "../interfaces/artist/artist";
import { MAXARTIST, MAXREALNAME } from "../interfaces/artist/artist.constant";
import { countryes } from "../data/country/country";
import { countryBD } from "../interfaces/country/countryBD";


export function isValidArtist(artist: Artist): boolean | string | undefined {

    if (!artist) {
        return false;
    }
    if (!artist.artist || !artist.realName || !artist.country) {
        return false
    }

    const longArtist: number = artist.artist.trim().replace(/\s+/g, "").length;
    const longRealName: number = artist.realName.trim().replace(/\s+/g, "").length;

    const dadesOK: boolean = longArtist > 0
        && longArtist <= MAXARTIST
        && longRealName > 0
        && longRealName <= MAXREALNAME

    if (!dadesOK) {
        console.log("BODY NO VALID");
        return false;
    }

    const countryOK = countryes.find(
        (c: countryBD) => c.id === artist.country
    );
    if (!countryOK) {
        console.log("BODY NO VALID");
        return false;
    }
    console.log("OK")
    return true;
}