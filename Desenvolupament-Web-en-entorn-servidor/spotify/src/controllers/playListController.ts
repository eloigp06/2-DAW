import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { Response, Request } from "express";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { createPlayList, deletePlayList, getAllPlayList, getPlayListById, updatePlayList } from "../Services/playList.Service";
import { PlayListBD } from "../interfaces/PlayList/playListBD";
import { playLists } from "../data/playList/playList";


export function getAllPlayListsController(_req: Request, res: Response): Response {
    return res.status(200).json(getAllPlayList())
}

export function getPlayListByIdController(req: Request, res: Response): Response {
    const findsPlayList: PlayListBD | undefined = getPlayListById(req.params.id as string);
    if (!findsPlayList) {
        return res.status(404).json({ message: "PlayList not found" })
    }
    return res.status(200).json(findsPlayList);
}

export function getPostPLayListController(req: Request, res: Response): Response {
    const result: successService<PlayListBD> | errorService = createPlayList(req.body);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    playLists.push((result as successService<PlayListBD>).data);
    return res.status(result.code).json(result);
}

export function getPutPlayListController(req: Request, res: Response): Response {
    const result: updateService<PlayListBD> | errorService = updatePlayList(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as updateService<PlayListBD>).index;
    playLists[index] = (result as updateService<PlayListBD>).data;
    return res.status(result.code).json(result);
}

export function getDeletePlayListController(req: Request, res: Response): Response {
      const result: deleteService | errorService = deletePlayList(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as deleteService).index;
    
      playLists.splice(index, 1);
    
      return res.status(result.code).json(result);
}