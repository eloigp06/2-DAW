import { randomUUID } from "crypto";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { isValidTrack } from "../validators/track.validator";
import { tracks } from "../data/track/track";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { getConnection } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";

export async function getAllTracks(): Promise<TrackBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select t.*,a.name from Track t inner join artist a on t.artist_id=a.id`;

    const result: IResult<TrackBD> = await request.query(queryText);
    return result.recordset;
}
export async function getTrackById(idTrack: string): Promise<successService<TrackBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select t.*,a.name from Track t inner join artist a on t.artist_id=a.id Where Track.id = @id`;
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

export async function createTrack(track: Track): Promise<createSuccessService | errorService> {

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const title: string = track.title.replace(/\s+/g, " ")
    const queryText: string = `INSERT INTO TRACK(title,artist_id,duration)
    VALUES(@title,@artist_id,@duration)`;

    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, track.artist);
    request.input("duration", sql.Numeric, track.duration)

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function updateTrack(track: Track, idTrack: string): Promise<updateService<TrackBD> | errorService> {
    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const title: string = track.title.replace(/\s+/g, " ")
    const queryText: string = `UPDATE TRACK SET
    title=@title,artist_id=@artist_id,duration=@duration 
    where track.id=@id`;

    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, track.artist);
    request.input("duration", sql.Numeric, track.duration)
    request.input("id", sql.UniqueIdentifier, idTrack);


    const result: IResult<number> = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deleteTrack(idTrack: string): Promise<deleteService | errorService> {
    
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `DElete from Track Where Track.id = @id`;
    request.input("id", sql.UniqueIdentifier, idTrack);
    const result: IResult<TrackBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }
    return {
        success: true,
        code: 204
    }

}