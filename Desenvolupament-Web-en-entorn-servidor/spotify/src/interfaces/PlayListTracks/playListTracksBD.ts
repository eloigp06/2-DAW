import { PlayListBD } from "../PlayList/playListBD"
import { TrackBD } from "../track/trackBD"

export interface playListTracksBD{
    id: string; //PK
    playList: PlayListBD;
    track: TrackBD;
}