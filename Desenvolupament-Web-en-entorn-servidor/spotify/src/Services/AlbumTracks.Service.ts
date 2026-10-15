import { randomUUID } from "crypto";
import { albumTracks } from "../data/albumTracks/albumTracks";
import { AlbumTracks } from "../interfaces/AlbumTracks/albumTracks";
import { AlbumTracksBD } from "../interfaces/AlbumTracks/albumTracksBD";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { DeleteService } from "./delete.Service";
import { SuccessService } from "./success.Service";
import { isValidAlbumTrack } from "../validators/albumTracks.validator";

export function getAllAlbumTracks(): AlbumTracksBD[] {
    return albumTracks;
}

export function getAlbumTrackById(id: string): AlbumTracksBD | undefined {
    return albumTracks.find((at: AlbumTracksBD) => at.id === id);
}

export function getTracksByAlbumId(albumId: string): AlbumTracksBD[] {
    return albumTracks.filter((at: AlbumTracksBD) => at.album === albumId);
}

export function createAlbumTrack(albumTrack: AlbumTracks): SuccessService<AlbumTracksBD> | ErrorService {
    if (!isValidAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idAlbumTrack: string = randomUUID();
    const albumTrackRecord: AlbumTracksBD = {
        id: idAlbumTrack,
        album: albumTrack.album.trim().replace(/\s+/g, " "),
        track: albumTrack.track.trim().replace(/\s+/g, " ")
    };

    return { success: true, code: 201, data: albumTrackRecord };
}

export function deleteAlbumTrack(id: string): DeleteService | ErrorService {
    const index: number = albumTracks.findIndex((at: AlbumTracksBD) => at.id === id);

    if (index === -1) {
        return { success: false, code: 404, message: "Album track relation not found" };
    }

    return { success: true, code: 200, index: index };
}