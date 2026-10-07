import { Country } from "../interfaces/country/country";
import { MAXCOUNTRY } from "../interfaces/country/country.constant";

export function isValidCountry(country: Country): boolean | string | undefined {

    if (!country) {
        return false;
    }
    if (!country.name) {
        return false
    }

    const longCountrie: number = country.name.trim().replace(/\s+/g, "").length;

    if (longCountrie === 0 || longCountrie > MAXCOUNTRY) {
        return false;
    }

    return true;
}