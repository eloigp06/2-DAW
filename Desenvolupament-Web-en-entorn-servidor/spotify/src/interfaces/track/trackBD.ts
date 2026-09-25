import { Track } from "./track";

export interface TrackBD extends Track{
    id: string;
    title: string;
    artist: string;
    duration: number;
}