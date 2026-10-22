"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APICONFIG = void 0;
exports.APICONFIG = {
    name: "API Spotify",
    description: "Manage Spotifiy functionality",
    host: "localhost",
    port: 3000,
    status: "ok",
    version: {
        major: 1,
        minor: 0,
        patch: 0
    },
    resources: [
        {
            name: "Root",
            endPoint: "/"
        },
        {
            name: "Track (songs",
            endPoint: "GET /tracks"
        }
    ],
};
