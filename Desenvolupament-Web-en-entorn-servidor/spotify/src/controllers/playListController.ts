import { errorService } from "../interfaces/error/errorSrvice";
import { successService } from "../interfaces/error/success.Service";
import { Response, Request } from "express";
import { updateService } from "../interfaces/error/update.Service";
import { deleteService } from "../interfaces/error/delete.Service";
import { createPlayList, deletePlayList, getAllPlayList, getPlayListById, updatePlayList } from "../Services/playList.Service";
import { PlayListBD } from "../interfaces/PlayList/playListBD";
import { playLists } from "../data/playList/playList";
import { createSuccessService } from "../interfaces/error/CreateSuccess.Service";


export async function getAllPlayListsController(_req: Request, res: Response): Promise<Response> {
    const playLists: PlayListBD[] = await getAllPlayList()
    return res.status(200).json(playLists)
}

export async function getPlayListByIdController(req: Request, res: Response): Promise<Response> {
    const result: successService<PlayListBD> | errorService = await getPlayListById(req.params.id as string);
    if (!result.success) {
        return res.status(result.code).json({ message: (result as errorService).message })
    }
    return res.status(result.code).json(result);
}

export async function getPostPLayListController(req: Request, res: Response): Promise<Response> {
    const result: successService<PlayListBD> | errorService = await createPlayList(req.body);


    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}



export async function getPutPlayListController(req: Request, res: Response): Promise<Response> {
    const result: updateService<number> | errorService =  await updatePlayList(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result);

}

export async function getDeletePlayListController(req: Request, res: Response): Promise<Response> {
    const result: deleteService | errorService = await deletePlayList(req.params.id as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result);
}