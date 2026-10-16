import { albums } from "../data/album/albums";
import { tracks } from "../data/track/track";
import { AlbumTracks } from "../interfaces/AlbumTracks/albumTracks";

export function isValidAlbumTrack(relation: any): relation is AlbumTracks {
  if (!relation || typeof relation !== "object") {
    return false;
  }

  const { album, track } = relation;

  if (typeof album !== "string" || album.trim() === "") {
    return false;
  }

  if (typeof track !== "string" || track.trim() === "") {
    return false;
  }

  // Comprueba que existan el álbum y el track referenciados
  const albumExists = albums.some((a) => a.id === album);
  const trackExists = tracks.some((t) => t.id === track);

  return albumExists && trackExists;
}