"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidArtist = isValidArtist;
const artist_constant_1 = require("../interfaces/artist/artist.constant");
const country_1 = require("../data/country/country");
function isValidArtist(artist) {
    if (!artist) {
        return false;
    }
    if (!artist.artist || !artist.realName || !artist.country) {
        return false;
    }
    const longArtist = artist.artist.trim().replace(/\s+/g, "").length;
    const longRealName = artist.realName.trim().replace(/\s+/g, "").length;
    const dadesOK = longArtist > 0
        && longArtist <= artist_constant_1.MAXARTIST
        && longRealName > 0
        && longRealName <= artist_constant_1.MAXREALNAME;
    if (!dadesOK) {
        console.log("BODY NO VALID");
        return false;
    }
    const idCountry = artist.country;
    const countriyOK = country_1.countryes.find((c) => { c.id === artist.country; });
    if (!countriyOK) {
        console.log("BODY NO VALID");
        return false;
    }
    console.log("OK");
    return true;
}
