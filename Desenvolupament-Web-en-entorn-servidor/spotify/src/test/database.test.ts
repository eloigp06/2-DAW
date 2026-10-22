import "dotenv/config";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { ConnectionPool } from "mssql";
import { after, before, test } from "node:test";
import { getConnection } from "../config/database.js";

let pool: ConnectionPool;
let server: Server;
let baseUrl: string;

before(async () => {
    pool = await getConnection();

    const { app } = await import("../app.js");
    server = createServer(app);
    await new Promise<void>((resolve, reject) => {
        server.once("error", reject);
        server.listen(0, "127.0.0.1", resolve);
    });

    const address = server.address();
    assert.ok(address && typeof address !== "string");
    baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
    if (server?.listening) {
        await new Promise<void>((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }

    if (pool?.connected) {
        await pool.close();
    }
});

test("configured database is reachable and contains the Spotify schema", async () => {
    const databaseResult = await pool.request().query("SELECT DB_NAME() AS database_name");
    const tablesResult = await pool.request().query(
        "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"
    );
    const databaseName = databaseResult.recordset[0]?.database_name as string | undefined;
    const tables = new Set(
        tablesResult.recordset.map((row: { TABLE_NAME: string }) => row.TABLE_NAME.toLowerCase())
    );

    assert.ok(databaseName);
    assert.equal(databaseName, process.env.DB_NAME);
    for (const table of [
        "album",
        "albumtracks",
        "artist",
        "country",
        "history",
        "playlist",
        "playlisttracks",
        "track",
        "user"
    ]) {
        assert.ok(tables.has(table), `Missing database table: ${table}`);
    }
});

test("GET /tracks returns the rows stored in SQL Server", async () => {
    const countResult = await pool.request().query("SELECT COUNT(*) AS row_count FROM [Track]");
    const response = await fetch(`${baseUrl}/tracks`);
    const body: unknown = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(body));
    assert.equal(body.length, Number(countResult.recordset[0]?.row_count));
});

test("user records can be counted with a read-only SQL query", async () => {
    const result = await pool.request().query("SELECT COUNT(*) AS row_count FROM [User]");
    const rowCount = Number(result.recordset[0]?.row_count);

    assert.ok(Number.isInteger(rowCount));
    assert.ok(rowCount >= 0);
});
