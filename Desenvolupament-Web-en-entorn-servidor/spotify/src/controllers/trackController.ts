import { tracks } from "../data/track/track";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../Services/track.Service";
import { Response, Request } from "express";
import { SuccessService } from "../interfaces/error/success.Service";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
import { CreateSuccessService } from "../interfaces/error/CreateSuccess.Service";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracks: TrackBD[] = await getAllTracks()
    return res.status(200).json(tracks)
}

export async function getTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: SuccessService<TrackBD> | ErrorService = await getTrackById(req.params.id as string);
    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message })
    }
    return res.status(result.code).json(result);
}

export async function getPostTrackController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<TrackBD> | ErrorService = await createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).json(result);
}

export async function getPutTrackController(req: Request, res: Response): Promise<Response> {
    const result: UpdateService<number> | ErrorService = await updateTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService; 
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result);
}

export async function getDeleteTrackController(req: Request, res: Response): Promise<Response> {
      const result: DeleteService | ErrorService = await deleteTrack(req.params.id as string);
    
 if (!result.success) {
        const errorResult = result as ErrorService; 
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).send();
}