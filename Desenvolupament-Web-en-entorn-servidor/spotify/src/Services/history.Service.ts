import { randomUUID } from "crypto";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { historyBD } from "../interfaces/history/historyBD";
import { historyes } from "../data/history/history";
import { History } from "../interfaces/history/history";
import { isValidHistory } from "../validators/history.validator";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql"
import { getConnection } from "../config/database";

export function getHistoryById(idHistory: string): historyBD | undefined {

    return historyes.find((h: historyBD) => { return h.id === idHistory });
}

export function createHistory(history: historyBD): successService<historyBD> | errorService {

    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const uuid: string = randomUUID();

    const historyRecord: historyBD = {
        id: uuid,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.replace(/\s+/g, " "),
        data: history.data
    };

    return { success: true, code: 201, data: historyRecord };
}

export async function addTrackUserHistory(historyTrack: History): Promise<createSuccessService | errorService> {

    if (!isValidHistory(historyTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `INSERT INTO History(user_id,track_id) VALUES(@user_id, @track_id)`;


    request.input("user_id", sql.UniqueIdentifier,historyTrack.user);
    request.input("track_id", sql.UniqueIdentifier, historyTrack.track);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };
}

