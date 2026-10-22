"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHistory = isValidHistory;
const history_1 = require("../data/history/history");
function isValidHistory(history) {
    if (!history) {
        return false;
    }
    if (!history.user || !history.track || !history.data) {
        return false;
    }
    const historyOK = history_1.historyes.find((h) => { h.id === history.track; });
    if (!historyOK) {
        console.log("BODY NO VALID");
        return false;
    }
    console.log("OK");
    return true;
}
