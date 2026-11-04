import { Router } from "express";
import { getAllAlbumTracksController, getAlbumTrackByIdController, getTracksByAlbumController, postAlbumTrackController, getDeleteAlbumTrackController } from "../controllers/albumTracksController";


export const albumTracksRouter: Router = Router();

albumTracksRouter.get("/", getAllAlbumTracksController);
albumTracksRouter.get("/:id", getAlbumTrackByIdController);
albumTracksRouter.get("/album/:albumId", getTracksByAlbumController);
albumTracksRouter.post("/", postAlbumTrackController);
albumTracksRouter.delete("/:id", getDeleteAlbumTrackController);