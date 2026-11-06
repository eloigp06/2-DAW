import { Request, Response } from "express";
import { albums } from "../data/album/albums";
import { Album } from "../interfaces/Album/album";
import { AlbumBD } from "../interfaces/Album/albumBD";
import { deleteService } from "../interfaces/error/delete.Service";
import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { updateService } from "../interfaces/error/update.Service";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";
import { createAlbum, deleteAlbum, getAllAlbums, getAlbumById, updateAlbum } from "../Services/album.Service";


export async function getAllAlbumsController(_req: Request, res: Response): Promise<Response> {
  const albums: AlbumBD[] = await getAllAlbums()
  return res.status(200).json(albums);
}

export async function getAlbumByIdController(req: Request, res: Response): Promise<Response> {
  
  const result: successService<AlbumBD> | errorService = await getAlbumById(req.params.id as string);
  if (!result.success) {
    return res.status(result.code).json({ message: (result as errorService).message });
  }
  return res.status(result.code).json(result);
}

export async function getPostAlbumController(req: Request, res: Response): Promise<Response> {
  const result: createSuccessService | errorService = await createAlbum(req.body);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }
  return res.status(result.code).json(result);
}

export async function getPutAlbumController(req: Request, res: Response): Promise<Response> {
  const result: updateService<AlbumBD> | errorService =  await updateAlbum( req.body, req.params.id as string);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }
  return res.status(result.code).json(result);
}

export async function getDeleteAlbumController(req: Request, res: Response): Promise<Response> {
  const result: deleteService | errorService = await deleteAlbum(req.params.id as string);

  if (!result.success) {
    const errorResult = result as errorService;
    return res.status(result.code).json({ message: errorResult.message });
  }

  return res.status(result.code).json(result);
}