import { randomUUID } from "crypto";
import { Track } from "../../interfaces/track/track";
import { TrackBD } from "../../interfaces/track/trackBD";
import { isValidTrack } from "../../validators/track.validator";
import { tracks } from "../track/track";
import { ErrorService } from "../../interfaces/error/errorSrvice";
import { SuccessService } from "./successService";
import { UpdateService } from "./updateService";

export function getAllTracks(): TrackBD[] {
    return tracks
}
export function getTrackById(idTrack: string): TrackBD | undefined {

    return tracks.find((t: TrackBD) => { return t.id === idTrack });
}

export function createTrack(track: Track): SuccessService<TrackBD> | ErrorService {

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: true, code: 201, data: trackRecord };
}

export function updateTrack(track: Track, idTrack: string): UpdateService<TrackBD> | ErrorService {
    const trackIndex: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);

    if (trackIndex === -1) {
        return { success: false, code: 404, message: "Track not found" };
    }

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const updatedTrack: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: false, code: 204, data: updatedTrack }
}