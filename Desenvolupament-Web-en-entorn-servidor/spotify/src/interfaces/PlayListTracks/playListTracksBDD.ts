import { playListBDD } from "../PlayList/playListBDD"
import { TrackBD } from "../track/trackBD"

export interface playListTracksBDD{
    id: string; //PK
    playList: playListBDD;
    track: TrackBD;
}