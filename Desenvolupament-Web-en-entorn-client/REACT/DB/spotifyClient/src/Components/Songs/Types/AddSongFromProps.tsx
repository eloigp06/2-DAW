import type { TrackCreate } from "../../../ApiManagments/Tracks/Interfaces/TrackCreate";
import type { Track } from "../../../Model/Track";

export interface AddSongFromProps {
    submit: (t: TrackCreate) => void;
    song?: Track;
    
}