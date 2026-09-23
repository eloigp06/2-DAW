import type { Track } from "../interfaces/track";
export function createRowSong(track: Track): HTMLTableRowElement {
    const tr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.innerHTML = track.title;

    const duration: HTMLTableCellElement = document.createElement("td");
    duration.innerHTML = track.duration.toString();

    tr.appendChild(titleTd);
    tr.appendChild(duration);

    return tr;
}