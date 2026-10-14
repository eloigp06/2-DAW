import { Router } from "express";
import { getHistoryByIdController, getPostHistoryController } from "../controllers/historyController";

export const historyRouter: Router = Router();

historyRouter.get("/", getHistoryByIdController);
historyRouter.post("/", getPostHistoryController);
