import { randomUUID } from "crypto";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { isValidTrack } from "../validators/track.validator";
import { tracks } from "../data/track/track";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { SuccessService } from "../interfaces/error/success.Service";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";
import { getConnection } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";

export async function getAllTracks(): Promise<TrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track`;

    const result: IResult<TrackBD> = await request.query(queryText);
    return result.recordset;
}
export async function getTrackById(idTrack: string): Promise<SelectSuccessService<TrackBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track Where Track.id = @id`;
    request.input("id", sql.UniqueIdentifier, idTrack);
    const result: IResult<TrackBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }
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
    const index: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);

    if (index === -1) {
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

    return { success: true, code: 200, index: index, data: updatedTrack }
}

export function deleteTrack(idTrack: string): DeleteService | ErrorService {
    const index: number = tracks.findIndex((track: TrackBD) => track.id === idTrack);

    if (index === -1) {
        return { success: false, code: 404, message: " Track not found " }
    }

    return { success: true, code: 404, index: index }

}