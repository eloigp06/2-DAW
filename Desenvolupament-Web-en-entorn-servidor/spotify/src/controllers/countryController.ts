import { countryes } from "../data/country/country";
import { countryBD } from "../interfaces/country/countryBD";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { createCountrye, getAllCountryes, updateCountry } from "../Services/country.Service";
import { SuccessService } from "../Services/success.Service";
import { UpdateService } from "../Services/update.Service";
import { Response, Request } from "express";

export function getAllCountryesController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllCountryes());
}


export function getPostUserController(req: Request, res: Response): Response {
    const result: SuccessService<countryBD> | ErrorService = createCountrye(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }


    countryes.push((result as SuccessService<countryBD>).data);
    return res.status(result.code).json(result);
}

export function getPutUserController(req: Request, res: Response): Response {
    const result: UpdateService<countryBD> | ErrorService = updateCountry(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as UpdateService<countryBD>).index;
    countryes[index] = (result as UpdateService<countryBD>).data;
    return res.status(result.code).json(result);
}
