import type { GetTrack } from "../../../ApiManagments/Tracks/Interfaces/Track";
import type { Track } from "../../../Model/Track";

export interface SongListProps {
    tracks: GetTrack[]
    edit: (t: Track) => void;

}