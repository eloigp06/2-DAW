import { Router } from "express";
import { getAllPlayListTracksController, getPlayListTrackByIdController, getTracksByPlayListController, getPostPlayListTrackController, getDeletePlayListTrackController } from "../controllers/playListTracksController";

export const playListTracksRouter: Router = Router();

playListTracksRouter.get("/", getAllPlayListTracksController);
playListTracksRouter.get("/:id", getPlayListTrackByIdController);
playListTracksRouter.get("/playlist/:playListId", getTracksByPlayListController);
playListTracksRouter.post("/", getPostPlayListTrackController);
playListTracksRouter.delete("/:id", getDeletePlayListTrackController);