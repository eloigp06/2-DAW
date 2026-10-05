import { TrackBD } from "../track/trackBD";

export interface albumTracksBDD{
    Id: string; //PK
    album: albumTracksBDD; //FK
    track: TrackBD; //FK
}
