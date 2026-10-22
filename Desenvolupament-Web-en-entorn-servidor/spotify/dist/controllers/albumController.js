"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbumsController = getAllAlbumsController;
exports.getAlbumByIdController = getAlbumByIdController;
exports.getPostAlbumController = getPostAlbumController;
exports.getPutAlbumController = getPutAlbumController;
exports.getDeleteAlbumController = getDeleteAlbumController;
const albums_1 = require("../data/album/albums");
const album_Service_1 = require("../Services/album.Service");
function getAllAlbumsController(_req, res) {
    return res.status(200).json((0, album_Service_1.getAllAlbums)());
}
function getAlbumByIdController(req, res) {
    const findsAlbum = (0, album_Service_1.getAlbumById)(req.params.id);
    if (!findsAlbum) {
        return res.status(404).json({ message: "Album not found" });
    }
    return res.status(200).json(findsAlbum);
}
function getPostAlbumController(req, res) {
    const result = (0, album_Service_1.createAlbum)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    albums_1.albums.push(result.data);
    return res.status(result.code).json(result);
}
function getPutAlbumController(req, res) {
    const result = (0, album_Service_1.updateAlbum)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    albums_1.albums[index] = result.data;
    return res.status(result.code).json(result);
}
function getDeleteAlbumController(req, res) {
    const result = (0, album_Service_1.deleteAlbum)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    albums_1.albums.splice(index, 1);
    return res.status(result.code).json(result);
}
