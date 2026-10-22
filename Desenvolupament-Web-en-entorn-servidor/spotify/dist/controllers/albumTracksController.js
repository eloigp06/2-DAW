"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbumTracksController = getAllAlbumTracksController;
exports.getAlbumTrackByIdController = getAlbumTrackByIdController;
exports.getTracksByAlbumController = getTracksByAlbumController;
exports.getPostAlbumTrackController = getPostAlbumTrackController;
exports.getDeleteAlbumTrackController = getDeleteAlbumTrackController;
const albumTracks_1 = require("../data/albumTracks/albumTracks");
const AlbumTracks_Service_1 = require("../Services/AlbumTracks.Service");
function getAllAlbumTracksController(_req, res) {
    return res.status(200).json((0, AlbumTracks_Service_1.getAllAlbumTracks)());
}
function getAlbumTrackByIdController(req, res) {
    const relation = (0, AlbumTracks_Service_1.getAlbumTrackById)(req.params.id);
    if (!relation) {
        return res.status(404).json({ message: "Album track relation not found" });
    }
    return res.status(200).json(relation);
}
function getTracksByAlbumController(req, res) {
    const relations = (0, AlbumTracks_Service_1.getTracksByAlbumId)(req.params.albumId);
    return res.status(200).json(relations);
}
function getPostAlbumTrackController(req, res) {
    const result = (0, AlbumTracks_Service_1.createAlbumTrack)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    albumTracks_1.albumTracks.push(result.data);
    return res.status(result.code).json(result);
}
function getDeleteAlbumTrackController(req, res) {
    const result = (0, AlbumTracks_Service_1.deleteAlbumTrack)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    albumTracks_1.albumTracks.splice(index, 1);
    return res.status(result.code).json(result);
}
