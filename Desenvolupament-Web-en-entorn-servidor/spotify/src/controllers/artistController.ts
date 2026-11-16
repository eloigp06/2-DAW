import { ArtistBD } from "../interfaces/artist/artistBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { createArtist, deleteArtist, getAllArtist, getArtistById, updateArtist } from "../Services/artist.Service";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { Response, Request } from "express";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";

export async function getAllArtistsController(_req: Request, res: Response): Promise<Response> {

    const artists: ArtistBD[] = await getAllArtist();

    return res.status(200).json(artists);
}

export async function getArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: successService<ArtistBD> | errorService = await getArtistById(req.params.id as string);
    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message })
    }
    return res.status(result.code).json(result);
}

export async function getPostArtistController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await createArtist(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).json(result);

}

export async function getPutArtistController(req: Request, res: Response): Promise<Response> {
    const result: updateService<number> | errorService = await updateArtist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result);
}

export async function getDeleteArtistController(req: Request, res: Response): Promise<Response> {
    const result: deleteService | errorService = await deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result);
}