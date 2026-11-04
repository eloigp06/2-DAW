import { Request, Response } from "express";
import { Album } from "../interfaces/Album/album";
import { AlbumBD } from "../interfaces/Album/albumBD";
import { deleteService } from "../interfaces/error/delete.Service";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { createAlbum, deleteAlbum, getAllAlbums, getAlbumById, updateAlbum } from "../Services/album.Service";


export async function getAllAlbumsController(_req: Request, res: Response): Promise<Response> {
  return res.status(200).json(await getAllAlbums());
}

export function getAlbumByIdController(req: Request, res: Response): Response {
  const findsAlbum: AlbumBD | undefined = getAlbumById(req.params.id as string);
  if (!findsAlbum) {
    return res.status(404).json({ message: "Album not found" });
  }
  return res.status(200).json(findsAlbum);
}

export function getPostAlbumController(req: Request, res: Response): Response {
  const result: successService<AlbumBD> | errorService = createAlbum(req.body);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  albums.push((result as successService<AlbumBD>).data);
  return res.status(result.code).json(result);
}

export function getPutAlbumController(req: Request, res: Response): Response {
  const result: updateService<AlbumBD> | errorService = updateAlbum(
    req.body,
    req.params.id as string
  );

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as updateService<AlbumBD>).index;
  albums[index] = (result as updateService<AlbumBD>).data;
  return res.status(result.code).json(result);
}

export function getDeleteAlbumController(req: Request, res: Response): Response {
  const result: deleteService | errorService = deleteAlbum(req.params.id as string);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as deleteService).index;
  albums.splice(index, 1);

  return res.status(result.code).json(result);
}