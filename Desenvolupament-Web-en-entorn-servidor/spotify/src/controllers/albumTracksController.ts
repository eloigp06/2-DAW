import { Request, Response } from "express";
import { AlbumTracks } from "../interfaces/AlbumTracks/albumTracks";
import { AlbumTracksBD } from "../interfaces/AlbumTracks/albumTracksBD";
import { deleteService } from "../interfaces/error/delete.Service";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { createAlbumTrack, deleteAlbumTrack, getAlbumTrackById, getAllAlbumTracks, getTracksByAlbumId } from "../Services/AlbumTracks.Service";


export async function getAllAlbumTracksController(_req: Request, res: Response): Promise<Response> {
  const albumTracks: AlbumTracksBD[] = await getAllAlbumTracks()
  return res.status(200).json(albumTracks);
}

export async function getAlbumTrackByIdController(req: Request, res: Response): Promise<Response> {
  const relation: successService<AlbumTracksBD> | errorService = await getAlbumTrackById(req.params.id as string);
  if (!relation) {
    return res.status(404).json({ message: "Album track relation not found" });
  }
  return res.status(200).json(relation);
}

export async function getTracksByAlbumController(req: Request, res: Response): Promise<Response> {
  const relations: AlbumTracksBD[] = await getTracksByAlbumId(req.params.albumId as string);
  return res.status(200).json(relations);
}


export async function postAlbumTrackController(req: Request, res: Response): Promise<Response> {
  const result: createSuccessService<AlbumTracksBD> | errorService = await createAlbumTrack(req.body);

  if (!result.success) {
    return res.status(result.code).json({ message: (result as errorService).message });
  }

  return res.status(result.code).json(result);
}

export function getDeleteAlbumTrackController(req: Request, res: Response): Response {
  const result: deleteService | errorService = deleteAlbumTrack(req.params.id as string);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as deleteService).index;
  albumTracks.splice(index, 1);

  return res.status(result.code).json(result);
}