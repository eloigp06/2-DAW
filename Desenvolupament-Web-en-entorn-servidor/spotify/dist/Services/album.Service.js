"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbums = getAllAlbums;
exports.getAlbumById = getAlbumById;
exports.createAlbum = createAlbum;
exports.updateAlbum = updateAlbum;
exports.deleteAlbum = deleteAlbum;
const crypto_1 = require("crypto");
const albums_1 = require("../data/album/albums");
const album_validator_1 = require("../validators/album.validator");
function getAllAlbums() {
    return albums_1.albums;
}
function getAlbumById(idAlbum) {
    return albums_1.albums.find((a) => a.id === idAlbum);
}
function createAlbum(album) {
    if (!(0, album_validator_1.isValidAlbum)(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const idAlbum = (0, crypto_1.randomUUID)();
    const albumRecord = {
        id: idAlbum,
        artist: album.artist.trim().replace(/\s+/g, " "),
        data: album.data.trim().replace(/\s+/g, " "),
        title: album.title.trim().replace(/\s+/g, " ")
    };
    return { success: true, code: 201, data: albumRecord };
}
function updateAlbum(album, idAlbum) {
    const index = albums_1.albums.findIndex((a) => a.id === idAlbum);
    if (index === -1) {
        return { success: false, code: 404, message: "Album not found" };
    }
    if (!(0, album_validator_1.isValidAlbum)(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const updatedAlbum = {
        id: idAlbum,
        artist: album.artist.trim().replace(/\s+/g, " "),
        data: album.data.trim().replace(/\s+/g, " "),
        title: album.title.trim().replace(/\s+/g, " ")
    };
    return { success: true, code: 200, index: index, data: updatedAlbum };
}
function deleteAlbum(idAlbum) {
    const index = albums_1.albums.findIndex((a) => a.id === idAlbum);
    if (index === -1) {
        return { success: false, code: 404, message: "Album not found" };
    }
    return { success: true, code: 200, index: index };
}
