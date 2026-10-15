import { Router } from "express";
import { getAllAlbumTracksController, getAlbumTrackByIdController, getTracksByAlbumController, getPostAlbumTrackController, getDeleteAlbumTrackController } from "../controllers/albumTracksController";


export const albumTracksRouter: Router = Router();

albumTracksRouter.get("/", getAllAlbumTracksController);
albumTracksRouter.get("/:id", getAlbumTrackByIdController);
albumTracksRouter.get("/album/:albumId", getTracksByAlbumController);
albumTracksRouter.post("/", getPostAlbumTrackController);
albumTracksRouter.delete("/:id", getDeleteAlbumTrackController);