import type { Track } from "../interfaces/track";
export function createRowSong(
    track: Track,
    Select: (track: Track) => void
): HTMLTableRowElement {
    
    const tr: HTMLTableRowElement = document.createElement("tr");
    tr.addEventListener("click", () => Select(track))
    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.innerHTML = track.title;





    const duration: HTMLTableCellElement = document.createElement("td");
    duration.innerHTML = track.duration.toString();


    tr.appendChild(titleTd);
    tr.appendChild(duration);

    return tr;
}