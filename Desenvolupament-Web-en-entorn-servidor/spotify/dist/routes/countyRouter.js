"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryRouter = void 0;
const express_1 = require("express");
const countryController_1 = require("../controllers/countryController");
exports.countryRouter = (0, express_1.Router)();
exports.countryRouter.get("/", countryController_1.getAllCountryesController);
exports.countryRouter.post("/", countryController_1.getPostUserController);
exports.countryRouter.put("/:id", countryController_1.getPutUserController);
