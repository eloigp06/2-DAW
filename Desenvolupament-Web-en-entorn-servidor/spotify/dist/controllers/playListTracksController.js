"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlayListTracksController = getAllPlayListTracksController;
exports.getPlayListTrackByIdController = getPlayListTrackByIdController;
exports.getTracksByPlayListController = getTracksByPlayListController;
exports.getPostPlayListTrackController = getPostPlayListTrackController;
exports.getDeletePlayListTrackController = getDeletePlayListTrackController;
const playListTracks_1 = require("../data/playListTracks/playListTracks");
const PlayListTracks_Service_1 = require("../Services/PlayListTracks.Service");
function getAllPlayListTracksController(_req, res) {
    return res.status(200).json((0, PlayListTracks_Service_1.getAllPlayListTracks)());
}
function getPlayListTrackByIdController(req, res) {
    const relation = (0, PlayListTracks_Service_1.getPlayListTrackById)(req.params.id);
    if (!relation) {
        return res.status(404).json({ message: "PlayList track relation not found" });
    }
    return res.status(200).json(relation);
}
function getTracksByPlayListController(req, res) {
    const relations = (0, PlayListTracks_Service_1.getTracksByPlayListId)(req.params.playListId);
    return res.status(200).json(relations);
}
function getPostPlayListTrackController(req, res) {
    const result = (0, PlayListTracks_Service_1.createPlayListTrack)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    playListTracks_1.playListTracks.push(result.data);
    return res.status(result.code).json(result);
}
function getDeletePlayListTrackController(req, res) {
    const result = (0, PlayListTracks_Service_1.deletePlayListTrack)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    playListTracks_1.playListTracks.splice(index, 1);
    return res.status(result.code).json(result);
}
