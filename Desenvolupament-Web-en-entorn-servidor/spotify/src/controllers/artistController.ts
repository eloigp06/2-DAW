import { artists } from "../data/artist/artists";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { createArtist, deleteArtist, getAllArtist, getArtistkById, updateArtist } from "../Services/artistService";
import { DeleteService } from "../Services/deleteService";
import { SuccessService } from "../Services/successService";
import { UpdateService } from "../Services/updateService";
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
    const result: SuccessService<ArtistBD> | ErrorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    artists.push((result as SuccessService<ArtistBD>).data);
    return res.status(result.code).json(result);
}

export function getPutArtistController(req: Request, res: Response): Response {
    const result: UpdateService<ArtistBD> | ErrorService = updateArtist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as UpdateService<ArtistBD>).index;
    artists[index] = (result as UpdateService<ArtistBD>).data;
    return res.status(result.code).json(result);
}

export function getDeleteArtistController(req: Request, res: Response): Response {
      const result: DeleteService | ErrorService = deleteArtist(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as DeleteService).index;
    
      artists.splice(index, 1);
    
      return res.status(result.code).json(result);
}