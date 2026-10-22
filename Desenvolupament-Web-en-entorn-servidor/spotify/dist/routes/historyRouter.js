"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyRouter = void 0;
const express_1 = require("express");
const historyController_1 = require("../controllers/historyController");
exports.historyRouter = (0, express_1.Router)();
exports.historyRouter.get("/", historyController_1.getHistoryByIdController);
exports.historyRouter.post("/", historyController_1.getPostHistoryController);
