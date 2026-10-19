import { randomUUID } from "crypto";
import { ErrorService } from "../interfaces/error/errorSrvice";
import { SuccessService } from "../interfaces/error/success.Service";
import { UpdateService } from "../interfaces/error/update.Service";
import { DeleteService } from "../interfaces/error/delete.Service";
import { SelectSuccessService } from "../interfaces/error/Selectsuccess.Service";
import { PlayListBD } from "../interfaces/PlayList/playListBD";
import { playLists } from "../data/playList/playList";
import { PlayList } from "../interfaces/PlayList/playList";
import { isValidPlayList } from "../validators/playList.validator";

export function getAllPlayList(): PlayListBD[] {
    return playLists
}
export function getPlayListById(idPlayList: string): PlayListBD | undefined {

    return playLists.find((p: PlayListBD) => { return p.id === idPlayList });
}

export function createPlayList(playList: PlayList): SuccessService<PlayList> | ErrorService {

    if (!isValidPlayList(playList)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const uuid: string = randomUUID();

    const playListRecord: PlayListBD = {
        id: uuid,
        title: playList.title.trim().replace(/\s+/g, " "),
        user: playList.user.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 201, data: playListRecord };
}

export function updatePlayList(playList: PlayList, idPlayList: string): UpdateService<PlayListBD> | ErrorService {
    const index: number = playLists.findIndex((playList: PlayListBD) => playList.id === idPlayList);

    if (index === -1) {
        return { success: false, code: 404, message: "PlayList not found" };
    }

    if (!isValidPlayList(playList)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const updatePlayList: PlayListBD = {
        id: idPlayList,
        title: playList.title.trim().replace(/\s+/g, " "),
        user: playList.user.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updatePlayList }
}

export function deletePlayList(idPlayList: string): DeleteService | ErrorService {
  const index: number = playLists.findIndex((playList: PlayListBD) => playList.id === idPlayList);

  if (index === -1) {
    return { success: false, code: 404, message: " PlayList not found " }
  }

      return { success: true, code: 404, index: index }

}