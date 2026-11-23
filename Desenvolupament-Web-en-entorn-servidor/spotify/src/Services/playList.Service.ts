import { randomUUID } from "crypto";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { PlayListBD } from "../interfaces/PlayList/playListBD";
import { playLists } from "../data/playList/playList";
import { PlayList } from "../interfaces/PlayList/playList";
import { isValidPlayList } from "../validators/playList.validator";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";

export async function getAllPlayList(): Promise<PlayListBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `SELECT * FROM PlayList`;
    const result: IResult<PlayListBD> = await request.query(queryText);
    return result.recordset;

}
export async function getPlayListById(idPlayList: string): Promise<successService<PlayListBD> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from PlayList 
        Where PlayList.id = @id`;
    request.input("id", sql.UniqueIdentifier, idPlayList);
    const result: IResult<PlayListBD> = await request.query(queryText);
    if (result.recordset.length === 0) {
        return { success: false, code: 404, message: "Album not found" };
    }
    return { success: true, code: 200, data: result.recordset[0] };
}

export async function createPlayList(playList: PlayList): Promise<successService<PlayListBD> | errorService> {

    if (!isValidPlayList(playList)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO Playlist(title, user_id)
        VALUES(@title, @user)`;

    request.input("title", sql.NVarChar(200), playList.title.trim().replace(/\s+/g, " "));
    request.input("user", sql.UniqueIdentifier, playList.user);
    const result: IResult<PlayListBD> = await request.query(queryText);
    return { success: true, code: 201, data: result.recordset[0] };
}

export async function updatePlayList(playList: PlayList, idPlayList: string): Promise<updateService<PlayListBD> | errorService> {

    if (!isValidPlayList(playList)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `
        UPDATE Playlist
        SET title = @title, user_id = @user
        WHERE id = @id`;

    request.input("id", sql.UniqueIdentifier, idPlayList);
    request.input("title", sql.NVarChar(200), playList.title.trim().replace(/\s+/g, " "));
    request.input("user", sql.UniqueIdentifier, playList.user);
    const result: IResult<number> = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Track not found" }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deletePlayList(idPlayList: string): Promise<deleteService | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const index: number = playLists.findIndex((playList: PlayListBD) => playList.id === idPlayList);

    if (index === -1) {
        return { success: false, code: 404, message: " PlayList not found " }
    }

    return { success: true, code: 404, index: index }

}