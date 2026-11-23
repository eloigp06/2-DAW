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

