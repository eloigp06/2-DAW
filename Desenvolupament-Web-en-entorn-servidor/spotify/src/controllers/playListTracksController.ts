import { Request, Response } from "express";
import { playListTracks } from "../data/playListTracks/playListTracks";
import { PlayListTracksBD } from "../interfaces/PlayListTracks/playListTracksBD";
import { errorService } from "../interfaces/error/errorSrvice";
import { createPlayListTrack, deletePlayListTrack, getAllPlayListTracks, getPlayListTrackById, getTracksByPlayListId } from "../Services/PlayListTracks.Service";
import { successService } from "../interfaces/error/success.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";
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
  const result: successService<PlayListTracksBD> | errorService = createPlayListTrack(req.body);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  playListTracks.push((result as successService<PlayListTracksBD>).data);
  return res.status(result.code).json(result);
}

export function getDeletePlayListTrackController(req: Request, res: Response): Response {
  const result: deleteService | errorService = deletePlayListTrack(req.params.id as string);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as deleteService).index;
  playListTracks.splice(index, 1);

  return res.status(result.code).json(result);
}