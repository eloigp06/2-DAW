import type { Track } from "../interfaces/track";
export function createRowSong(track: Track): HTMLTableRowElement {
    const tr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");



    const clickTitle: HTMLSpanElement = document.createElement("click");
    clickTitle.textContent = track.title;

    const ListClick: HTMLParagraphElement = document.createElement("p");
    ListClick.textContent = (`Cançó: ${track.title} - Artista: ${track.artist}`);



    clickTitle.addEventListener("click",
        () => {
            titleTd.appendChild(ListClick);

        }
    );





    const duration: HTMLTableCellElement = document.createElement("td");
    duration.innerHTML = track.duration.toString();


    titleTd.appendChild(clickTitle);
    tr.appendChild(titleTd);
    tr.appendChild(duration);

    return tr;
}