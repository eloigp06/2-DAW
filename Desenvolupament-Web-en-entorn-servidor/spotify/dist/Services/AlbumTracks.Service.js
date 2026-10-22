"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbumTracks = getAllAlbumTracks;
exports.getAlbumTrackById = getAlbumTrackById;
exports.getTracksByAlbumId = getTracksByAlbumId;
exports.createAlbumTrack = createAlbumTrack;
exports.deleteAlbumTrack = deleteAlbumTrack;
const crypto_1 = require("crypto");
const albumTracks_1 = require("../data/albumTracks/albumTracks");
const albumTracks_validator_1 = require("../validators/albumTracks.validator");
function getAllAlbumTracks() {
    return albumTracks_1.albumTracks;
}
function getAlbumTrackById(id) {
    return albumTracks_1.albumTracks.find((at) => at.id === id);
}
function getTracksByAlbumId(albumId) {
    return albumTracks_1.albumTracks.filter((at) => at.album === albumId);
}
function createAlbumTrack(albumTrack) {
    if (!(0, albumTracks_validator_1.isValidAlbumTrack)(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const idAlbumTrack = (0, crypto_1.randomUUID)();
    const albumTrackRecord = {
        id: idAlbumTrack,
        album: albumTrack.album.trim().replace(/\s+/g, " "),
        track: albumTrack.track.trim().replace(/\s+/g, " ")
    };
    return { success: true, code: 201, data: albumTrackRecord };
}
function deleteAlbumTrack(id) {
    const index = albumTracks_1.albumTracks.findIndex((at) => at.id === id);
    if (index === -1) {
        return { success: false, code: 404, message: "Album track relation not found" };
    }
    return { success: true, code: 200, index: index };
}
