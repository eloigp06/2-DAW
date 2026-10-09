import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { SuccessService } from "./success.Service";
import { UpdateService } from "./update.Service";
import { DeleteService } from "./delete.Service";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../data/artist/artists";
import { Artist } from "../interfaces/artist/artist";
import { getCanonicalCountry, isValidArtist } from "../validators/artist.validator";

export function getAllArtist(): ArtistBD[] {
    return artists;
}

export function getArtistkById(idArtist: string): ArtistBD | undefined {

    return artists.find((a: ArtistBD) => { return a.id === idArtist });
}

export function createArtist(artist: Artist): SuccessService<ArtistBD> | ErrorService {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idartista: string = randomUUID()
    const artistkRecord: ArtistBD = {
        id: idartista,
        artist: artist.artist.trim().replace(/\s+/g, " "),
        realName: artist.realName.replace(/\s+/g, " "),
        country: getCanonicalCountry(artist.country)
    };
    return { success: true, code: 201, data: artistkRecord };
}

export function updateArtist(artist: Artist, idArtist: string): UpdateService<ArtistBD> | ErrorService {
    const index: number = artists.findIndex((artist: ArtistBD) => artist.id === idArtist);

    if (index === -1) {
        return { success: false, code: 404, message: "Artist not found" };
    }

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const updateArtist: ArtistBD = {
        id: idArtist,
        artist: artist.artist.trim().replace(/\s+/g, " "),
        realName: artist.realName.trim().replace(/\s+/g, " "),
        country: artist.country
    };

    return { success: true, code: 200, index: index, data: updateArtist }
}

export function deleteArtist(idArtist: string): DeleteService | ErrorService {
    const index: number = artists.findIndex((artist: ArtistBD) => artist.id === idArtist);

    if (index === -1) {
        return { success: false, code: 404, message: " Artist not found " }
    }

    return { success: true, code: 404, index: index }

}