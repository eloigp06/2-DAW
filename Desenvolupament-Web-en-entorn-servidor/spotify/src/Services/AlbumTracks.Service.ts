import { AlbumTracks } from "../interfaces/AlbumTracks/albumTracks";
import { AlbumTracksBD } from "../interfaces/AlbumTracks/albumTracksBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { isValidAlbumTrack } from "../validators/albumTracks.validator";
import { getConnection } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";

export async function getAllAlbumTracks(): Promise<AlbumTracksBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from AlbumTracks`;

    const result: IResult<AlbumTracksBD> = await request.query(queryText);
    return result.recordset;
}

export async function getAlbumTrackById(id: string): Promise<successService<AlbumTracksBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `SELECT * FROM AlbumTracks WHERE id = @id`;

    request.input("id", sql.UniqueIdentifier, id);
    const result: IResult<AlbumTracksBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Album track relation not found" };
    }

    return { success: true, code: 200, data: result.recordset[0] };
}


export async function getTracksByAlbumId(albumId: string): Promise<AlbumTracksBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `SELECT * FROM AlbumTracks WHERE album_id = @albumId`;

    request.input("albumId", sql.UniqueIdentifier, albumId);
    const result: IResult<AlbumTracksBD> = await request.query(queryText);

    return result.recordset;
}

export async function createAlbum(album: Album): Promise<createSuccessService<AlbumBD> | errorService> {
    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `
    INSERT INTO Album (artist_id, date, title) VALUES 
    (@artist, @date, @title)`
    request.input("artist", sql.UniqueIdentifier, album.artist);
    request.input("date", sql.Date, album.data);
    request.input("title", sql.NVarChar, album.title.trim().replace(/\s+/g, " "));

    const result: IResult<number> = await request.query(queryText);


    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export async function createAlbumTrack(albumTrack: AlbumTracks): Promise<createSuccessService<AlbumTracksBD> | errorService> {
    if (!isValidAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO AlbumTracks (album_id, track_id) VALUES (@album, @track)`
    request.input("album", sql.UniqueIdentifier, albumTrack.album);
    request.input("track", sql.UniqueIdentifier, albumTrack.track);
    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

export function deleteAlbumTrack(id: string): deleteService | errorService {
    const index: number = albumTracks.findIndex((at: AlbumTracksBD) => at.id === id);

    if (index === -1) {
        return { success: false, code: 404, message: "Album track relation not found" };
    }

    return { success: true, code: 200, index: index };
}