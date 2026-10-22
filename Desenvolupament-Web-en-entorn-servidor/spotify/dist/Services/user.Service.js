"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const user_validator_1 = require("../validators/user.validator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getAllUsers() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from User`;
    const result = await request.query(queryText);
    return result.recordset;
}
async function getUserById(idUser) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from User Where User.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idUser);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
async function createUser(user) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `INSERT INTO USER(id,country,email)
    VALUES(@id,@country,@email)`;
    request.input("country", mssql_1.default.UniqueIdentifier, user.country);
    request.input("email", mssql_1.default.NVarChar, user.email);
    const result = await request.query(queryText);
    return { success: true, code: 201, data: result.rowsAffected[0] };
}
async function updateUser(user, idUser) {
    if (!(0, user_validator_1.isValidUser)(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    ;
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE USER SET
    country=@country,email=@email 
    where user.id=@id`;
    request.input("country", mssql_1.default.NVarChar, user.country);
    request.input("email", mssql_1.default.UniqueIdentifier, user.email);
    request.input("id", mssql_1.default.UniqueIdentifier, idUser);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        };
    }
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
async function deleteUser(idUser) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `DElete from User Where User.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idUser);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        };
    }
    return {
        success: true,
        code: 204
    };
}
