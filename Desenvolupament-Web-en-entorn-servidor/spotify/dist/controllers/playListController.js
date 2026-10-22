"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlayListsController = getAllPlayListsController;
exports.getPlayListByIdController = getPlayListByIdController;
exports.getPostPLayListController = getPostPLayListController;
exports.getPutPlayListController = getPutPlayListController;
exports.getDeletePlayListController = getDeletePlayListController;
const playList_Service_1 = require("../Services/playList.Service");
const playList_1 = require("../data/playList/playList");
function getAllPlayListsController(_req, res) {
    return res.status(200).json((0, playList_Service_1.getAllPlayList)());
}
function getPlayListByIdController(req, res) {
    const findsPlayList = (0, playList_Service_1.getPlayListById)(req.params.id);
    if (!findsPlayList) {
        return res.status(404).json({ message: "PlayList not found" });
    }
    return res.status(200).json(findsPlayList);
}
function getPostPLayListController(req, res) {
    const result = (0, playList_Service_1.createPlayList)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    playList_1.playLists.push(result.data);
    return res.status(result.code).json(result);
}
function getPutPlayListController(req, res) {
    const result = (0, playList_Service_1.updatePlayList)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    playList_1.playLists[index] = result.data;
    return res.status(result.code).json(result);
}
function getDeletePlayListController(req, res) {
    const result = (0, playList_Service_1.deletePlayList)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    playList_1.playLists.splice(index, 1);
    return res.status(result.code).json(result);
}
