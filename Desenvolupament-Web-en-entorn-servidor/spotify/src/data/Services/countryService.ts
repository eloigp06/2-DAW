import { randomUUID } from "crypto";
import { Country } from "../../interfaces/country/country";
import { countryBD } from "../../interfaces/country/countryBD";
import { ErrorService } from "../../interfaces/error/errorSrvice";
import { isValidCountry } from "../../validators/country.validator";
import { countryes } from "../country/country";
import { SuccessService } from "./successService";
import { DeleteService } from "./deleteService";
import { UpdateService } from "./updateService";

export function getAllCountryes(): countryBD[] {
    return countryes;
}

export function createCountrye(country: Country): SuccessService<countryBD> | ErrorService {


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

export function updateCountry(country: Country, idCountry: string): UpdateService<countryBD> | ErrorService {
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