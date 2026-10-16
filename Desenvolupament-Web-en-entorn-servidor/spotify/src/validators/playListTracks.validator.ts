import { playLists } from "../data/playList/playList";
import { tracks } from "../data/track/track";
import { PlayListTracks } from "../interfaces/PlayListTracks/playListTracks";

export function isValidPlayListTrack(relation: any): relation is PlayListTracks {
  if (!relation || typeof relation !== "object") {
    return false;
  }

  const { playList, track } = relation;

  if (typeof playList !== "string" || playList.trim() === "") {
    return false;
  }

  if (typeof track !== "string" || track.trim() === "") {
    return false;
  }

  // Comprueba que existan la playlist y el track referenciados
  const playListExists = playLists.some((p) => p.id === playList);
  const trackExists = tracks.some((t) => t.id === track);

  return playListExists && trackExists;
}