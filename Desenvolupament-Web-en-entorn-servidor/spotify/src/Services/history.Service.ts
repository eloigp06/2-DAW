import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { SuccessService } from "./success.Service";
import { historyBD } from "../interfaces/history/historyBD";
import { historyes } from "../data/history/history";
import { History } from "../interfaces/history/history";
import { isValidHistory } from "../validators/history.validator";

export function getHistoryById(idHistory: string): historyBD | undefined {

    return historyes.find((h: historyBD) => { return h.id === idHistory });
}

export function createHistory(history: History): SuccessService<historyBD> | ErrorService {

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