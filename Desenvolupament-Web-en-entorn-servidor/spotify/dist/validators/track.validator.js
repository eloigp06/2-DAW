"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTrack = isValidTrack;
const track_constant_1 = require("../interfaces/track/track.constant");
function isValidTrack(track) {
    let correcte = true;
    if (!track.artist || !track.title || !track.duration) {
        return false;
    }
    const longTitle = track.title.trim().replace(/\s+/g, "").length;
    const longArtist = track.title.trim().replace(/\s+/g, "").length;
    if (longArtist === 0 || longArtist > track_constant_1.MAXARTIST) {
        return false;
    }
    if (longTitle === 0 || longTitle > track_constant_1.MAXTITLE) {
        return false;
    }
    if (track.duration < 1) {
        return false;
    }
    if (track.artist.trim().length === 0 || track.title.trim().length === 0 || track.duration <= 0) {
        correcte = false;
    }
    return correcte;
}
