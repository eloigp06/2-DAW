import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { after, before, test } from "node:test";

let server: Server;
let baseUrl: string;

before(async () => {
    Object.assign(process.env, {
        DB_USER: "test",
        DB_PASSWORD: "test",
        DB_HOST: "127.0.0.1",
        DB_PORT: "1433",
        DB_NAME: "test",
        DB_ENCRYPT: "false",
        DB_TRUST_SERVER_CERTIFICATE: "true"
    });

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
});

test("GET /countryes returns the seeded countries", async () => {
    const response = await fetch(`${baseUrl}/countryes`);
    const countries: unknown = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(countries));
    assert.ok(countries.length > 0);
});

test("POST and PUT /countryes create, normalize, and update a country", async () => {
    const createResponse = await fetch(`${baseUrl}/countryes`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "New   Zealand" })
    });
    const created = await createResponse.json() as {
        success: boolean;
        data: { id: string; name: string };
    };

    assert.equal(createResponse.status, 201);
    assert.equal(created.success, true);
    assert.equal(created.data.name, "New Zealand");

    const updateResponse = await fetch(`${baseUrl}/countryes/${created.data.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "  South   Korea " })
    });
    const updated = await updateResponse.json() as {
        success: boolean;
        data: { id: string; name: string };
    };

    assert.equal(updateResponse.status, 200);
    assert.equal(updated.success, true);
    assert.equal(updated.data.name, "South Korea");
});

test("POST /countryes rejects an empty name", async () => {
    const response = await fetch(`${baseUrl}/countryes`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "   " })
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: "Invalid data" });
});

test("POST /tracks rejects invalid data before connecting to SQL Server", async () => {
    const response = await fetch(`${baseUrl}/tracks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "A track", artist: "an artist", duration: 0 })
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: "Invalid data" });
});

test("POST /artists accepts an artist with a seeded country", async () => {
    const countriesResponse = await fetch(`${baseUrl}/countryes`);
    const countries = await countriesResponse.json() as Array<{ id: string }>;
    const response = await fetch(`${baseUrl}/artists`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            artist: "Test Artist",
            realName: "Test Person",
            country: countries[0].id
        })
    });

    assert.equal(response.status, 201);
});

test("POST /playLists accepts the fields defined by the PlayList interface", async () => {
    const response = await fetch(`${baseUrl}/playLists`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "Test playlist", user: "test-user-id" })
    });

    assert.equal(response.status, 201);
});
