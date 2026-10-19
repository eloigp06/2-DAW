import { Request, Response } from "express";
import { albums } from "../data/album/albums";
import { AlbumBD } from "../interfaces/Album/albumBD";
import { ErrorService } from "../interfaces/error/errorSrvice";
import {
  createAlbum,
  deleteAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum
} from "../Services/album.Service";
import { SuccessService } from "../interfaces/error/success.Service";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";

export function getAllAlbumsController(_req: Request, res: Response): Response {
  return res.status(200).json(getAllAlbums());
}

export function getAlbumByIdController(req: Request, res: Response): Response {
  const findsAlbum: AlbumBD | undefined = getAlbumById(req.params.id as string);
  if (!findsAlbum) {
    return res.status(404).json({ message: "Album not found" });
  }
  return res.status(200).json(findsAlbum);
}

export function getPostAlbumController(req: Request, res: Response): Response {
  const result: SuccessService<AlbumBD> | ErrorService = createAlbum(req.body);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  albums.push((result as SuccessService<AlbumBD>).data);
  return res.status(result.code).json(result);
}

export function getPutAlbumController(req: Request, res: Response): Response {
  const result: UpdateService<AlbumBD> | ErrorService = updateAlbum(
    req.body,
    req.params.id as string
  );

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as UpdateService<AlbumBD>).index;
  albums[index] = (result as UpdateService<AlbumBD>).data;
  return res.status(result.code).json(result);
}

export function getDeleteAlbumController(req: Request, res: Response): Response {
  const result: DeleteService | ErrorService = deleteAlbum(req.params.id as string);

  if (!result.success) {
    const errorResult = result as ErrorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  const index: number = (result as DeleteService).index;
  albums.splice(index, 1);

  return res.status(result.code).json(result);
}