"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryById = getHistoryById;
exports.createHistory = createHistory;
const crypto_1 = require("crypto");
const history_1 = require("../data/history/history");
const history_validator_1 = require("../validators/history.validator");
function getHistoryById(idHistory) {
    return history_1.historyes.find((h) => { return h.id === idHistory; });
}
function createHistory(history) {
    if (!(0, history_validator_1.isValidHistory)(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid = (0, crypto_1.randomUUID)();
    const historyRecord = {
        id: uuid,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.replace(/\s+/g, " "),
        data: history.data
    };
    return { success: true, code: 201, data: historyRecord };
}
