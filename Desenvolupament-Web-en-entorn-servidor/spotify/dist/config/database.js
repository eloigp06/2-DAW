"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
require("dotenv/config");
const mssql_1 = __importDefault(require("mssql"));
function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing enviroment variable ${name}`);
    }
    return value;
}
const databaseConfig = {
    user: getRequiredEnv("DB_USER"),
    password: getRequiredEnv("DB_PASSWORD"),
    server: getRequiredEnv("DB_HOST"),
    port: Number(getRequiredEnv("DB_PORT")),
    database: getRequiredEnv("DB_NAME"),
    options: {
        encrypt: getRequiredEnv("DB_ENCRYPT") === "true",
        trustServerCertificate: getRequiredEnv("DB_TRUST_SERVER_CERTIFICATE") === "true"
    }
};
let pool = null;
async function getConnection() {
    if (pool) {
        return pool;
    }
    pool = await mssql_1.default.connect(databaseConfig);
    return pool;
}
