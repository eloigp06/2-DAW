"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPlayList = isValidPlayList;
const playList_constant_1 = require("../interfaces/PlayList/playList.constant");
function isValidPlayList(playList) {
    if (!playList) {
        return false;
    }
    if (!playList.id || !playList.title || !playList.user) {
        return false;
    }
    const longTitle = playList.title.trim().replace(/\s+/g, "").length;
    const dadesOK = longTitle > 0
        && longTitle <= playList_constant_1.MAXTITLE;
    if (!dadesOK) {
        console.log("BODY NO VALID");
        return false;
    }
    return true;
}
