import { countryes } from "../data/country/country";
import { countryBD } from "../interfaces/country/countryBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { createCountrye, getAllCountryes, updateCountry } from "../Services/country.Service";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";
import { Response, Request } from "express";

export function getAllCountryesController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllCountryes());
}


export function getPostUserController(req: Request, res: Response): Response {
    const result: successService<countryBD> | errorService = createCountrye(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }


    countryes.push((result as successService<countryBD>).data);
    return res.status(result.code).json(result);
}

export function getPutUserController(req: Request, res: Response): Response {
    const result: updateService<countryBD> | errorService = updateCountry(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as updateService<countryBD>).index;
    countryes[index] = (result as updateService<countryBD>).data;
    return res.status(result.code).json(result);
}
