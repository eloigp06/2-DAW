import { Request, Response } from "express";
import { albumTracks } from "../data/albumTracks/albumTracks";
import { AlbumTracksBD } from "../interfaces/AlbumTracks/albumTracksBD";
import { ErrorService } from "../interfaces/error/errorSrvice";
import {
  createAlbumTrack,
  deleteAlbumTrack,
  getAlbumTrackById,
  getAllAlbumTracks,
  getTracksByAlbumId
} from "../Services/AlbumTracks.Service";
import { DeleteService } from "../Services/delete.Service";
import { SuccessService } from "../Services/success.Service";

export function getAllAlbumTracksController(_req: Request, res: Response): Response {
  return res.status(200).json(getAllAlbumTracks());
}

export function getAlbumTrackByIdController(req: Request, res: Response): Response {
  const relation: AlbumTracksBD | undefined = getAlbumTrackById(req.params.id as string);
  if (!relation) {
    return res.status(404).json({ message: "Album track relation not found" });
  }
  return res.status(200).json(relation);
}

export function getTracksByAlbumController(req: Request, res: Response): Response {
  const relations: AlbumTracksBD[] = getTracksByAlbumId(req.params.albumId as string);
  return res.status(200).json(relations);
}

export function getPostAlbumTrackController(req: Request, res: Response): Response {
  const result: SuccessService<AlbumTracksBD> | ErrorService = createAlbumTrack(req.body);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  albumTracks.push((result as SuccessService<AlbumTracksBD>).data);
  return res.status(result.code).json(result);
}

export function getDeleteAlbumTrackController(req: Request, res: Response): Response {
  const result: DeleteService | ErrorService = deleteAlbumTrack(req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as DeleteService).index;
  albumTracks.splice(index, 1);

  return res.status(result.code).json(result);
}