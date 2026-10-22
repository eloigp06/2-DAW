"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = getAllUsersController;
exports.getUserByIdController = getUserByIdController;
exports.getPostUserController = getPostUserController;
exports.getPutUserController = getPutUserController;
exports.getDeleteUserController = getDeleteUserController;
const user_Service_1 = require("../Services/user.Service");
const user_1 = require("../data/user/user");
function getAllUsersController(_req, res) {
    return res.status(200).json((0, user_Service_1.getAllUsers)());
}
function getUserByIdController(req, res) {
    const findsUser = (0, user_Service_1.getUserById)(req.params.id);
    if (!findsUser) {
        return res.status(404).json({ message: "Artist not found" });
    }
    return res.status(200).json(findsUser);
}
function getPostUserController(req, res) {
    const result = (0, user_Service_1.createUser)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    user_1.users.push(result.data);
    return res.status(result.code).json(result);
}
function getPutUserController(req, res) {
    const result = (0, user_Service_1.updateUser)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    user_1.users[index] = result.data;
    return res.status(result.code).json(result);
}
function getDeleteUserController(req, res) {
    const result = (0, user_Service_1.deleteUser)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    user_1.users.splice(index, 1);
    return res.status(result.code).json(result);
}
