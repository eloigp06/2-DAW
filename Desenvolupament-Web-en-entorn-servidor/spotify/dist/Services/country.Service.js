"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountryes = getAllCountryes;
exports.createCountrye = createCountrye;
exports.updateCountry = updateCountry;
const crypto_1 = require("crypto");
const country_validator_1 = require("../validators/country.validator");
const country_1 = require("../data/country/country");
function getAllCountryes() {
    return country_1.countryes;
}
function createCountrye(country) {
    if (!(0, country_validator_1.isValidCountry)(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const idCountry = (0, crypto_1.randomUUID)();
    const CountryRecord = {
        id: idCountry,
        name: country.name.replace(/\s+/g, " ")
    };
    return { success: true, code: 201, data: CountryRecord };
}
function updateCountry(country, idCountry) {
    const index = country_1.countryes.findIndex((country) => country.id === idCountry);
    if (index === -1) {
        return { success: false, code: 404, message: "Country not found" };
    }
    if (!(0, country_validator_1.isValidCountry)(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const updatedCountry = {
        id: idCountry,
        name: country.name.trim().replace(/\s+/g, " "),
    };
    return { success: true, code: 200, index: index, data: updatedCountry };
}
