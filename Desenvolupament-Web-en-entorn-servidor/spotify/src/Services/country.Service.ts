import { randomUUID } from "crypto";
import { Country } from "../interfaces/country/country";
import { countryBD } from "../interfaces/country/countryBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { isValidCountry } from "../validators/country.validator";
import { countryes } from "../data/country/country";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";

export function getAllCountryes(): countryBD[] {
    return countryes;
}

export function createCountrye(country: Country): successService<countryBD> | errorService {


    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const idCountry: string = randomUUID()
    const CountryRecord: countryBD = {
        id: idCountry,
        name: country.name.replace(/\s+/g, " ")
    };

    return { success: true, code: 201, data: CountryRecord };


}

export function updateCountry(country: Country, idCountry: string): updateService<countryBD> | errorService {
    const index: number = countryes.findIndex((country: countryBD) => country.id === idCountry);

    if (index === -1) {
        return { success: false, code: 404, message: "Country not found" };
    }

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const updatedCountry: countryBD = {
        id: idCountry,
        name: country.name.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updatedCountry }

}