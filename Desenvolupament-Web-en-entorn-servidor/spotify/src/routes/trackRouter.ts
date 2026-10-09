import { Router } from "express";
import { getAllTracksController, getDeleteTrackController, getPostTrackController, getPutTrackController, getTrackByIdController } from "../controllers/trackController";

export const trackRouter:Router = Router();

trackRouter.get("/", getAllTracksController);
trackRouter.get("/:id", getTrackByIdController);
trackRouter.post("/", getPostTrackController);
trackRouter.put("/:id", getPutTrackController);
trackRouter.delete("/:id", getDeleteTrackController);

