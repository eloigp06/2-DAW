import { ArtistBD } from "../artist/artistBD"

export interface albumBD{
    id: string; //PK
    artist: ArtistBD;
    data: string;
}