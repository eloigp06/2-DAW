"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlayListTracks = getAllPlayListTracks;
exports.getPlayListTrackById = getPlayListTrackById;
exports.getTracksByPlayListId = getTracksByPlayListId;
exports.createPlayListTrack = createPlayListTrack;
exports.deletePlayListTrack = deletePlayListTrack;
const crypto_1 = require("crypto");
const playListTracks_1 = require("../data/playListTracks/playListTracks");
const playListTracks_validator_1 = require("../validators/playListTracks.validator");
function getAllPlayListTracks() {
    return playListTracks_1.playListTracks;
}
function getPlayListTrackById(id) {
    return playListTracks_1.playListTracks.find((plt) => plt.id === id);
}
function getTracksByPlayListId(playListId) {
    return playListTracks_1.playListTracks.filter((plt) => plt.playList === playListId);
}
function createPlayListTrack(playListTrack) {
    if (!(0, playListTracks_validator_1.isValidPlayListTrack)(playListTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const idPlayListTrack = (0, crypto_1.randomUUID)();
    const playListTrackRecord = {
        id: idPlayListTrack,
        playList: playListTrack.playList.trim().replace(/\s+/g, " "),
        track: playListTrack.track.trim().replace(/\s+/g, " ")
    };
    return { success: true, code: 201, data: playListTrackRecord };
}
function deletePlayListTrack(id) {
    const index = playListTracks_1.playListTracks.findIndex((plt) => plt.id === id);
    if (index === -1) {
        return { success: false, code: 404, message: "PlayList track relation not found" };
    }
    return { success: true, code: 200 };
}
