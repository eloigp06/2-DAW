"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTracksController = getAllTracksController;
exports.getTrackByIdController = getTrackByIdController;
exports.getPostTrackController = getPostTrackController;
exports.getPutTrackController = getPutTrackController;
exports.getDeleteTrackController = getDeleteTrackController;
const track_Service_1 = require("../Services/track.Service");
async function getAllTracksController(_req, res) {
    const tracks = await (0, track_Service_1.getAllTracks)();
    return res.status(200).json(tracks);
}
async function getTrackByIdController(req, res) {
    const result = await (0, track_Service_1.getTrackById)(req.params.id);
    if (!result.success) {
        return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result);
}
async function getPostTrackController(req, res) {
    const result = await (0, track_Service_1.createTrack)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function getPutTrackController(req, res) {
    const result = await (0, track_Service_1.updateTrack)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function getDeleteTrackController(req, res) {
    const result = await (0, track_Service_1.deleteTrack)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
