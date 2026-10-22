"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountryesController = getAllCountryesController;
exports.getPostUserController = getPostUserController;
exports.getPutUserController = getPutUserController;
const country_1 = require("../data/country/country");
const country_Service_1 = require("../Services/country.Service");
function getAllCountryesController(_req, res) {
    return res.status(200).json((0, country_Service_1.getAllCountryes)());
}
function getPostUserController(req, res) {
    const result = (0, country_Service_1.createCountrye)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    country_1.countryes.push(result.data);
    return res.status(result.code).json(result);
}
function getPutUserController(req, res) {
    const result = (0, country_Service_1.updateCountry)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index = result.index;
    country_1.countryes[index] = result.data;
    return res.status(result.code).json(result);
}
