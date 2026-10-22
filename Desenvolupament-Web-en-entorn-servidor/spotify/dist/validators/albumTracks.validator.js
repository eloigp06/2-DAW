"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAlbumTrack = isValidAlbumTrack;
const albums_1 = require("../data/album/albums");
const track_1 = require("../data/track/track");
function isValidAlbumTrack(relation) {
    if (!relation || typeof relation !== "object") {
        return false;
    }
    const { album, track } = relation;
    if (typeof album !== "string" || album.trim() === "") {
        return false;
    }
    if (typeof track !== "string" || track.trim() === "") {
        return false;
    }
    // Comprueba que existan el álbum y el track referenciados
    const albumExists = albums_1.albums.some((a) => a.id === album);
    const trackExists = track_1.tracks.some((t) => t.id === track);
    return albumExists && trackExists;
}
