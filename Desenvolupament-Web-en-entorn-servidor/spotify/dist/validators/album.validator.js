"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAlbum = isValidAlbum;
const artists_1 = require("../data/artist/artists");
function isValidAlbum(album) {
    if (!album || typeof album !== "object") {
        return false;
    }
    const { artist, data } = album;
    if (typeof artist !== "string" || artist.trim() === "") {
        return false;
    }
    if (typeof data !== "string" || data.trim() === "") {
        return false;
    }
    const artistExists = artists_1.artists.some((a) => a.id === artist);
    if (!artistExists) {
        return false;
    }
    return true;
}
