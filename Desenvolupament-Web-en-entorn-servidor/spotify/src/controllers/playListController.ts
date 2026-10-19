import { ErrorService } from "../interfaces/error/errorSrvice";
import { SuccessService } from "../interfaces/error/success.Service";
import { Response, Request } from "express";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
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
    const result: SuccessService<PlayListBD> | ErrorService = createPlayList(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    playLists.push((result as SuccessService<PlayListBD>).data);
    return res.status(result.code).json(result);
}

export function getPutPlayListController(req: Request, res: Response): Response {
    const result: UpdateService<PlayListBD> | ErrorService = updatePlayList(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    const index: number = (result as UpdateService<PlayListBD>).index;
    playLists[index] = (result as UpdateService<PlayListBD>).data;
    return res.status(result.code).json(result);
}

export function getDeletePlayListController(req: Request, res: Response): Response {
      const result: DeleteService | ErrorService = deletePlayList(req.params.id as string);
    
      if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
      }
    
      const index: number = (result as DeleteService).index;
    
      playLists.splice(index, 1);
    
      return res.status(result.code).json(result);
}