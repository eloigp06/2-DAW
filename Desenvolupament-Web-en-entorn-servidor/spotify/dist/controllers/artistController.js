"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtistsController = getAllArtistsController;
exports.getArtistByIdController = getArtistByIdController;
exports.getPostArtistController = getPostArtistController;
exports.getPutArtistController = getPutArtistController;
exports.getDeleteArtistController = getDeleteArtistController;
const artists_1 = require("../data/artist/artists");
const artist_Service_1 = require("../Services/artist.Service");
function getAllArtistsController(_req, res) {
    return res.status(200).json((0, artist_Service_1.getAllArtist)());
}
function getArtistByIdController(req, res) {
    const findsArtist = (0, artist_Service_1.getArtistkById)(req.params.id);
    if (!findsArtist) {
        return res.status(404).json({ message: "Artist not found" });
    }
    return res.status(200).json(findsArtist);
}
function getPostArtistController(req, res) {
    const result = (0, artist_Service_1.createArtist)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    artists_1.artists.push(result.data);
    return res.status(result.code).json(result);
}
function getPutArtistController(req, res) {
    const result = (0, artist_Service_1.updateArtist)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    artists_1.artists[index] = result.data;
    return res.status(result.code).json(result);
}
function getDeleteArtistController(req, res) {
    const result = (0, artist_Service_1.deleteArtist)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    artists_1.artists.splice(index, 1);
    return res.status(result.code).json(result);
}
