"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPlayListTrack = isValidPlayListTrack;
const playList_1 = require("../data/playList/playList");
const track_1 = require("../data/track/track");
function isValidPlayListTrack(relation) {
    if (!relation || typeof relation !== "object") {
        return false;
    }
    const { playList, track } = relation;
    if (typeof playList !== "string" || playList.trim() === "") {
        return false;
    }
    if (typeof track !== "string" || track.trim() === "") {
        return false;
    }
    // Comprueba que existan la playlist y el track referenciados
    const playListExists = playList_1.playLists.some((p) => p.id === playList);
    const trackExists = track_1.tracks.some((t) => t.id === track);
    return playListExists && trackExists;
}
