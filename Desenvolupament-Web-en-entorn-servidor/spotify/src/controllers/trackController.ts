import { tracks } from "../data/track/track";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { TrackBD } from "../interfaces/track/trackBD";
import { SuccessService } from "../Services/success.Service";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../Services/track.Service";
import { Response, Request } from "express";
import { UpdateService } from "../Services/update.Service";
import { DeleteService } from "../Services/delete.Service";

export function getAllTracksController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllTracks())
}

export function getTrackByIdController(req: Request, res: Response): Response {
    const finsdTrack: TrackBD | undefined = getTrackById(req.params.id as string);
    if (!finsdTrack) {
        return res.status(404).json({ message: "Track not found" })
    }
    return res.status(200).json(finsdTrack);
}

export function getPostTrackController(req: Request, res: Response): Response {
    const result: SuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    tracks.push((result as SuccessService<TrackBD>).data);
    return res.status(result.code).json(result);
}

export function getPutTrackController(req: Request, res: Response): Response {
    const result: UpdateService<TrackBD> | ErrorService = updateTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as UpdateService<TrackBD>).index;
    tracks[index] = (result as UpdateService<TrackBD>).data;
    return res.status(result.code).json(result);
}

export function getDeleteTrackController(req: Request, res: Response): Response {
      const result: DeleteService | ErrorService = deleteTrack(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as DeleteService).index;
    
      tracks.splice(index, 1);
    
      return res.status(result.code).json(result);
}