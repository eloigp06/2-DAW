import { artists } from "../data/artist/artists";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { createArtist, deleteArtist, getAllArtist, getArtistkById, updateArtist } from "../Services/artist.Service";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";
import { Response, Request } from "express";

export function getAllArtistsController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllArtist())
}

export function getArtistByIdController(req: Request, res: Response): Response {
    const findsArtist: ArtistBD | undefined = getArtistkById(req.params.id as string);
    if (!findsArtist) {
        return res.status(404).json({ message: "Artist not found" })
    }
    return res.status(200).json(findsArtist);
}

export function getPostArtistController(req: Request, res: Response): Response {
    const result: successService<ArtistBD> | errorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    artists.push((result as successService<ArtistBD>).data);
    return res.status(result.code).json(result);
}

export function getPutArtistController(req: Request, res: Response): Response {
    const result: updateService<ArtistBD> | errorService = updateArtist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as updateService<ArtistBD>).index;
    artists[index] = (result as updateService<ArtistBD>).data;
    return res.status(result.code).json(result);
}

export function getDeleteArtistController(req: Request, res: Response): Response {
      const result: deleteService | errorService = deleteArtist(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as deleteService).index;
    
      artists.splice(index, 1);
    
      return res.status(result.code).json(result);
}