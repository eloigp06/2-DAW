import { artists } from "../data/artist/artists";
import { Album } from "../interfaces/Album/album";

export function isValidAlbum(album: any): album is Album {
  if (!album || typeof album !== "object") {
    return false;
  }

  const { artist, data } = album;

  if (typeof artist !== "string" || artist.trim() === "") {
    return false;
  }

  if (typeof data !== "string" || data.trim() === "") {
    return false;
  }

  const artistExists = artists.some((a) => a.id === artist);
  if (!artistExists) {
    return false;
  }

  return true;
}