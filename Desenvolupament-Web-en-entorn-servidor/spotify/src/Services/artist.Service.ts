import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../data/artist/artists";
import { Artist } from "../interfaces/artist/artist";
import { isValidArtist } from "../validators/artist.validator";
import { getConnection } from "../config/database";
import sql from "mssql";
import { ConnectionPool, IResult } from "mssql";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";

export async function getAllArtist(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from Artist`;
    const result: IResult<ArtistBD> = await request.query(queryText);
    return result.recordset;
}

export async function getArtistById(idArtist: string): Promise<successService<ArtistBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `SELECT * FROM Artist WHERE id = @id`;
    request.input("id", sql.UniqueIdentifier, idArtist);
    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Artist not found" };

    }
    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createArtist(artist: Artist): Promise<createSuccessService | errorService> {

    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO Artist(name, pseudonym, country_id)
        VALUES(@realName, @artist, @country)`;

    request.input("artist", sql.NVarChar, artist.artist.trim().replace(/\+/g, " "));
    request.input("realName", sql.NVarChar, artist.realName.trim().replace(/\+/g, " "));
    request.input("country", sql.UniqueIdentifier, artist.country);

    const result: IResult<ArtistBD> = await request.query(queryText);
    return { success: true, code: 200, data: result.rowsAffected[0] };

}

export async function updateArtist(artist: Artist, idArtist: string): Promise<updateService<ArtistBD> | errorService> {


    if (!isValidArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE Artis 
        SET name = @realName, pseudonym = @artist, country_id = @country
        WHERE id = @id`;

    request.input("id", sql.UniqueIdentifier, idArtist);
    request.input("artist", sql.NVarChar, artist.artist.trim().replace(/\+/g, " "));
    request.input("realName", sql.NVarChar, artist.realName.trim().replace(/\+/g, " "));
    request.input("country", sql.UniqueIdentifier, artist.country);

    const result: IResult<ArtistBD> = await request.query(queryText);

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deleteArtist(idArtist: string): Promise<deleteService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `DELETE FROM Artist WHERE id = @id`;
    request.input("id", sql.UniqueIdentifier, idArtist);
    const result: IResult<ArtistBD> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Artist not found" };
    }

    return { success: true, code: 200 }

}