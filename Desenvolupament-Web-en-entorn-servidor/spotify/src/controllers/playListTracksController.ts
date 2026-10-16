import { Request, Response } from "express";
import { playListTracks } from "../data/playListTracks/playListTracks";
import { PlayListTracksBD } from "../interfaces/PlayListTracks/playListTracksBD";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { DeleteService } from "../Services/delete.Service";
import {
  createPlayListTrack,
  deletePlayListTrack,
  getAllPlayListTracks,
  getPlayListTrackById,
  getTracksByPlayListId
} from "../Services/PlayListTracks.Service";
import { SuccessService } from "../Services/success.Service";

export function getAllPlayListTracksController(_req: Request, res: Response): Response {
  return res.status(200).json(getAllPlayListTracks());
}

export function getPlayListTrackByIdController(req: Request, res: Response): Response {
  const relation: PlayListTracksBD | undefined = getPlayListTrackById(req.params.id as string);
  if (!relation) {
    return res.status(404).json({ message: "PlayList track relation not found" });
  }
  return res.status(200).json(relation);
}

export function getTracksByPlayListController(req: Request, res: Response): Response {
  const relations: PlayListTracksBD[] = getTracksByPlayListId(req.params.playListId as string);
  return res.status(200).json(relations);
}

export function getPostPlayListTrackController(req: Request, res: Response): Response {
  const result: SuccessService<PlayListTracksBD> | ErrorService = createPlayListTrack(req.body);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  playListTracks.push((result as SuccessService<PlayListTracksBD>).data);
  return res.status(result.code).json(result);
}

export function getDeletePlayListTrackController(req: Request, res: Response): Response {
  const result: DeleteService | ErrorService = deletePlayListTrack(req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as DeleteService).index;
  playListTracks.splice(index, 1);

  return res.status(result.code).json(result);
}