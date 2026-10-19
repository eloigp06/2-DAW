import { tracks } from "../data/track/track";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../Services/track.Service";
import { Response, Request } from "express";
import { SuccessService } from "../interfaces/error/success.Service";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracks: TrackBD[] = await getAllTracks()
    return res.status(200).json(tracks)
}

export async function getTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: SelectSuccessService<TrackBD> | ErrorService = await getTrackById(req.params.id as string);
    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message })
    }
    return res.status(result.code).json(result);
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