import { TrackBD } from "../track/trackBD";

export interface albumTracksBDD{
    id: string; //PK
    album: albumTracksBDD; //FK
    track: TrackBD; //FK
}
