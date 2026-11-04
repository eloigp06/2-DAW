import { Request, Response } from "express";
import { AlbumTracks } from "../interfaces/AlbumTracks/albumTracks";
import { AlbumTracksBD } from "../interfaces/AlbumTracks/albumTracksBD";
import { deleteService } from "../interfaces/error/delete.Service";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import {createAlbumTrack, deleteAlbumTrack, getAlbumTrackById, getAllAlbumTracks, getTracksByAlbumId } from "../Services/AlbumTracks.Service";


export async function getAllAlbumTracksController(_req: Request, res: Response): Promise<Response> {
    const albumTracks: AlbumTracksBD[] = await getAllAlbumTracks()
  return res.status(200).json(albumTracks);
}

export async function getAlbumTrackByIdController(req: Request, res: Response): Promise<Response> {
  const relation: AlbumTracksBD | undefined = await getAlbumTrackById(req.params.id as string);
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
  const result: successService<AlbumTracksBD> | errorService = createAlbumTrack(req.body);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  albumTracks.push((result as successService<AlbumTracksBD>).data);
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