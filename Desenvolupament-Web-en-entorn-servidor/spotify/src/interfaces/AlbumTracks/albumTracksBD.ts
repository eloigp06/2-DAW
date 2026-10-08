import { TrackBD } from "../track/trackBD";

export interface albumTracksBD{
    id: string; //PK
    album: albumTracksBD; //FK
    track: TrackBD; //FK
}
