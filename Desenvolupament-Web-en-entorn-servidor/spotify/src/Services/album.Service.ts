import { Album } from "../interfaces/Album/album";
import { AlbumBD } from "../interfaces/Album/albumBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { isValidAlbum } from "../validators/album.validator";
import { getConnection } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";


export async function getAllAlbums(): Promise<AlbumBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from Album`;

    const result: IResult<AlbumBD> = await request.query(queryText);
    return result.recordset;
}

export async function getAlbumById(idAlbum: string): Promise<successService<AlbumBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Album Where Album.id = @id`;

    request.input("id", sql.UniqueIdentifier, idAlbum);
    const result: IResult<AlbumBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Album not found" };
    }
    return { success: true, code: 200, data: result.recordset[0] };
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

export function updateAlbum(album: Album, idAlbum: string): UpdateService<AlbumBD> | ErrorService {
    const index: number = albums.findIndex((a: AlbumBD) => a.id === idAlbum);

    if (index === -1) {
        return { success: false, code: 404, message: "Album not found" };
    }

    if (!isValidAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const updatedAlbum: AlbumBD = {
        id: idAlbum,
        artist: album.artist.trim().replace(/\s+/g, " "),
        data: album.data.trim().replace(/\s+/g, " "),
        title: album.title.trim().replace(/\s+/g, " ")
    };

    return { success: true, code: 200, index: index, data: updatedAlbum };
}

export function deleteAlbum(idAlbum: string): DeleteService | ErrorService {
    const index: number = albums.findIndex((a: AlbumBD) => a.id === idAlbum);

    if (index === -1) {
        return { success: false, code: 404, message: "Album not found" };
    }

    return { success: true, code: 200, index: index };
}