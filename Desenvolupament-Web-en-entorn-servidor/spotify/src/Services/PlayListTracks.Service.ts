import { PlayListTracks } from "../interfaces/PlayListTracks/playListTracks";
import { PlayListTracksBD } from "../interfaces/PlayListTracks/playListTracksBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { isValidPlayListTrack } from "../validators/playListTracks.validator";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";

export async function getAllPlayListTracks(): Promise<PlayListTracksBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `SELECT * FROM playListTracks`;
    const result: IResult<PlayListTracksBD> = await request.query(queryText);
    return result.recordset;
}

export function getPlayListTrackById(id: string): PlayListTracksBD | undefined {
    return playListTracks.find((plt: PlayListTracksBD) => plt.id === id);
}

export function getTracksByPlayListId(playListId: string): PlayListTracksBD[] {
    return playListTracks.filter((plt: PlayListTracksBD) => plt.playList === playListId);
}

export function createPlayListTrack(playListTrack: PlayListTracks): successService<PlayListTracksBD> | errorService {
    if (!isValidPlayListTrack(playListTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idPlayListTrack: string = randomUUID();
    const playListTrackRecord: PlayListTracksBD = {
        id: idPlayListTrack,
        playList: playListTrack.playList.trim().replace(/\s+/g, " "),
        track: playListTrack.track.trim().replace(/\s+/g, " ")
    };

    return { success: true, code: 201, data: playListTrackRecord };
}

export function deletePlayListTrack(id: string): deleteService | errorService {
    const index: number = playListTracks.findIndex((plt: PlayListTracksBD) => plt.id === id);

    if (index === -1) {
        return { success: false, code: 404, message: "PlayList track relation not found" };
    }

    return { success: true, code: 200 };
}
