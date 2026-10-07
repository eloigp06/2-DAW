import { ArtistBD } from "../artist/artistBD"

export interface albumBDD{
    id: string; //PK
    artist: ArtistBD;
    data: string;
}