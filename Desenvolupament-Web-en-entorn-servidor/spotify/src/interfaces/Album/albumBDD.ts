import { ArtistBD } from "../artist/artistBD"

export interface albumBDD{
    Id: string; //PK
    artist: ArtistBD;
    data: string;
}