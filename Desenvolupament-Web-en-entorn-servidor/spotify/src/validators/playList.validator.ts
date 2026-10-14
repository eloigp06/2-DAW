import { PlayList } from "../interfaces/PlayList/playList";
import { MAXTITLE } from "../interfaces/PlayList/playList.constant";


export function isValidPlayList(playList: PlayList): boolean | string | undefined {

    if (!playList) {
        return false;
    }
    if (!playList.id || !playList.title || !playList.user ) {
        return false
    }

    const longTitle: number = playList.title.trim().replace(/\s+/g, "").length;

    const dadesOK: boolean = longTitle > 0
        && longTitle <= MAXTITLE

    if (!dadesOK) {
        console.log("BODY NO VALID");
        return false;
    }
    return true;
}