"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUser = isValidUser;
function isValidUser(user) {
    if (!user) {
        return false;
    }
    if (!user.country || !user.email) {
        return false;
    }
}
