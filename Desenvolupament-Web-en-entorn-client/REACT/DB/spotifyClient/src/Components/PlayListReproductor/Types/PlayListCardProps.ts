import type { GetPlayList } from "../../../ApiManagments/PlayLists/interface/PlayList";
import type { GetPlayListsTracks } from "../../../ApiManagments/PlayLists copy/interface/PlayListsTracks";
import type { GetTrack } from "../../../ApiManagments/Tracks/Interfaces/Track";

export interface PlayListCardProps{
    playList: GetPlayList[];
    playListTracks: GetPlayListsTracks[];
    tracks: GetTrack[];
    onPlay: (track: GetTrack) => void;
}