import { randomUUID } from "crypto";
import { Track } from "../../interfaces/track/track";
import { TrackBD } from "../../interfaces/track/trackBD";
import { isValidTrack } from "../../validators/track.validator";
import { tracks } from "../track/track";
import { ErrorService } from "../../interfaces/error/errorSrvice";
import { SuccessService } from "./successService";

export function getAllTracks(): TrackBD[] {
    return tracks
}
export function getTrackById(idTrack: string): TrackBD | undefined {

    return tracks.find((t: TrackBD) => { return t.id === idTrack });
}

export function createTrack(track: Track): SuccessService<TrackBD> | ErrorService {

    if (!isValidTrack(track)) {
        return {success: false, code: 400, message: "Invalid data"};
    }
    
    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.replace(/\s+/g, " "),
        duration: track.duration
    };
    
    return {success: true, code: 201, data: trackRecord};
}