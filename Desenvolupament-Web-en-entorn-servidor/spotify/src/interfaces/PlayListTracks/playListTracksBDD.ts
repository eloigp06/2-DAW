import { playListBDD } from "../PlayList/playListBDD"
import { TrackBD } from "../track/trackBD"

export interface playListTracksBDD{
    Id: string; //PK
    playList: playListBDD;
    track: TrackBD;
}