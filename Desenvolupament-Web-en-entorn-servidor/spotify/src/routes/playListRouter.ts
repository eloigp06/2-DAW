import { Router } from "express";
import { getAllPlayListsController, getDeletePlayListController, getPostPLayListController, getPutPlayListController, getPlayListByIdController } from "../controllers/playListController";

export const playListRouter:Router = Router();

playListRouter.get("/", getAllPlayListsController);
playListRouter.get("/:id", getPlayListByIdController);
playListRouter.post("/", getPostPLayListController);
playListRouter.put("/:id", getPutPlayListController);
playListRouter.delete("/:id", getDeletePlayListController);

