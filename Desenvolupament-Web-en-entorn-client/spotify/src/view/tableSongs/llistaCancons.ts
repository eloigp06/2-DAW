import type { Track } from "../../interfaces/track";
import { createRowSong } from "../rowView";

export function llistaCancons(tracks: Track[], tbody: HTMLTableSectionElement): void {
    tracks.forEach(
        (t: Track) => {
            tbody.appendChild(createRowSong(t));
        }
    )
}