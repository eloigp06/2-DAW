import { Track } from "./track";

export interface TrackBD extends Track{
    id: string; //PK
    title: string;
    artist: string; //FK
    duration: number;
}