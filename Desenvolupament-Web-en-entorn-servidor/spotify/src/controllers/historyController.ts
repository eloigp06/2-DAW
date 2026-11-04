import { errorService } from "../interfaces/error/errorSrvice";
import { historyBD } from "../interfaces/history/historyBD";
import { createHistory, getHistoryById } from "../Services/history.Service";
import { Request, Response } from "express";
import { successService } from "../interfaces/error/success.Service";
import { historyes } from "../data/history/history";

export function getHistoryByIdController(req: Request, res: Response): Response {
    const findsHistoy: historyBD | undefined = getHistoryById(req.params.id as string);
    if (!findsHistoy) {
        return res.status(404).json({ message: "History not found" })
    }
    return res.status(200).json(findsHistoy);
}

export function getPostHistoryController(req: Request, res: Response): Response {
    const result: successService<historyBD> | errorService = createHistory(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    historyes.push((result as successService<historyBD>).data);
    return res.status(result.code).json(result);
}