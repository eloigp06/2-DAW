"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiConfig_1 = require("./config/apiConfig");
const app_1 = require("./app");
app_1.app.listen(apiConfig_1.APICONFIG.port, apiConfig_1.APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${apiConfig_1.APICONFIG.host}:${apiConfig_1.APICONFIG.port}`);
});
