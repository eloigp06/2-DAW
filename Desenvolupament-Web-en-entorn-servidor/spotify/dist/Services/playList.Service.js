"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlayList = getAllPlayList;
exports.getPlayListById = getPlayListById;
exports.createPlayList = createPlayList;
exports.updatePlayList = updatePlayList;
exports.deletePlayList = deletePlayList;
const crypto_1 = require("crypto");
const playList_1 = require("../data/playList/playList");
const playList_validator_1 = require("../validators/playList.validator");
function getAllPlayList() {
    return playList_1.playLists;
}
function getPlayListById(idPlayList) {
    return playList_1.playLists.find((p) => { return p.id === idPlayList; });
}
function createPlayList(playList) {
    if (!(0, playList_validator_1.isValidPlayList)(playList)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid = (0, crypto_1.randomUUID)();
    const playListRecord = {
        id: uuid,
        title: playList.title.trim().replace(/\s+/g, " "),
        user: playList.user.trim().replace(/\s+/g, " "),
    };
    return { success: true, code: 201, data: playListRecord };
}
function updatePlayList(playList, idPlayList) {
    const index = playList_1.playLists.findIndex((playList) => playList.id === idPlayList);
    if (index === -1) {
        return { success: false, code: 404, message: "PlayList not found" };
    }
    if (!(0, playList_validator_1.isValidPlayList)(playList)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const updatePlayList = {
        id: idPlayList,
        title: playList.title.trim().replace(/\s+/g, " "),
        user: playList.user.trim().replace(/\s+/g, " "),
    };
    return { success: true, code: 200, index: index, data: updatePlayList };
}
function deletePlayList(idPlayList) {
    const index = playList_1.playLists.findIndex((playList) => playList.id === idPlayList);
    if (index === -1) {
        return { success: false, code: 404, message: " PlayList not found " };
    }
    return { success: true, code: 404, index: index };
}
