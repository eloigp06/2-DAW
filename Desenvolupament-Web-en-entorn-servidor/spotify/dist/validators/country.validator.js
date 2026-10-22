"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCountry = isValidCountry;
const country_constant_1 = require("../interfaces/country/country.constant");
function isValidCountry(country) {
    if (!country) {
        return false;
    }
    if (!country.name) {
        return false;
    }
    const longCountrie = country.name.trim().replace(/\s+/g, "").length;
    if (longCountrie === 0 || longCountrie > country_constant_1.MAXCOUNTRY) {
        return false;
    }
    return true;
}
