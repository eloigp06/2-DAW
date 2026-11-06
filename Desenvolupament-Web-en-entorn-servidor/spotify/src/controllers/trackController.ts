import { errorService } from "../interfaces/error/errorSrvice";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from "../Services/track.Service";
import { Response, Request } from "express";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { addTrackUserHistory } from "../Services/history.Service";

export async function getAllTracksController(_req: Request, res: Response): Promise<Response> {
    const tracks: TrackBD[] = await getAllTracks()
    return res.status(200).json(tracks)
}

export async function getTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: successService<TrackBD> | errorService = await getTrackById(req.params.id as string);
    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message })
    }
    return res.status(result.code).json(result);
}

export async function getPostTrackController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await createTrack(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).json(result);
}

export async function getPutTrackController(req: Request, res: Response): Promise<Response> {
    const result: updateService<number> | errorService = await updateTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result);
}

export async function getDeleteTrackController(req: Request, res: Response): Promise<Response> {
    const result: deleteService | errorService = await deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).send();
}

export async function postTrackUserHistoryController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await addTrackUserHistory(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).json(result);
}