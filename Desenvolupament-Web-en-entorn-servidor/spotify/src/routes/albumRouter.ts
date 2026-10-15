import { Router } from "express";
import { getAllAlbumsController, getAlbumByIdController, getPostAlbumController, getPutAlbumController, getDeleteAlbumController } from "../controllers/albumController";

export const albumRouter: Router = Router();

albumRouter.get("/", getAllAlbumsController);
albumRouter.get("/:id", getAlbumByIdController);
albumRouter.post("/", getPostAlbumController);
albumRouter.put("/:id", getPutAlbumController);
albumRouter.delete("/:id", getDeleteAlbumController);