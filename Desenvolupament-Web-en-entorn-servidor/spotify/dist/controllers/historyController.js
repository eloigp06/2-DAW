"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryByIdController = getHistoryByIdController;
exports.getPostHistoryController = getPostHistoryController;
const history_Service_1 = require("../Services/history.Service");
const history_1 = require("../data/history/history");
function getHistoryByIdController(req, res) {
    const findsHistoy = (0, history_Service_1.getHistoryById)(req.params.id);
    if (!findsHistoy) {
        return res.status(404).json({ message: "History not found" });
    }
    return res.status(200).json(findsHistoy);
}
function getPostHistoryController(req, res) {
    const result = (0, history_Service_1.createHistory)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    history_1.historyes.push(result.data);
    return res.status(result.code).json(result);
}
