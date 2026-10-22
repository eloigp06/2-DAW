"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtist = getAllArtist;
exports.getArtistkById = getArtistkById;
exports.createArtist = createArtist;
exports.updateArtist = updateArtist;
exports.deleteArtist = deleteArtist;
const crypto_1 = require("crypto");
const artists_1 = require("../data/artist/artists");
const artist_validator_1 = require("../validators/artist.validator");
function getAllArtist() {
    return artists_1.artists;
}
function getArtistkById(idArtist) {
    return artists_1.artists.find((a) => { return a.id === idArtist; });
}
function createArtist(artist) {
    if (!(0, artist_validator_1.isValidArtist)(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const idartista = (0, crypto_1.randomUUID)();
    const artistkRecord = {
        id: idartista,
        artist: artist.artist.trim().replace(/\s+/g, " "),
        realName: artist.realName.replace(/\s+/g, " "),
        country: artist.country
    };
    return { success: true, code: 201, data: artistkRecord };
}
function updateArtist(artist, idArtist) {
    const index = artists_1.artists.findIndex((artist) => artist.id === idArtist);
    if (index === -1) {
        return { success: false, code: 404, message: "Artist not found" };
    }
    if (!(0, artist_validator_1.isValidArtist)(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const updateArtist = {
        id: idArtist,
        artist: artist.artist.trim().replace(/\s+/g, " "),
        realName: artist.realName.trim().replace(/\s+/g, " "),
        country: artist.country
    };
    return { success: true, code: 200, index: index, data: updateArtist };
}
function deleteArtist(idArtist) {
    const index = artists_1.artists.findIndex((artist) => artist.id === idArtist);
    if (index === -1) {
        return { success: false, code: 404, message: " Artist not found " };
    }
    return { success: true, code: 404, index: index };
}
