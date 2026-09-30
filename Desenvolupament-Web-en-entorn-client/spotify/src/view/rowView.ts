import type { Track } from "../interfaces/track";
export function createRowSong(track: Track): HTMLTableRowElement {
    const tr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");

    const clickTitle: HTMLSpanElement = document.createElement("Span");
    clickTitle.innerHTML = track.title;

    const ListClick: HTMLParagraphElement = document.createElement("p");
    ListClick.innerHTML = (`Cançó: ${track.title} - Artista: ${track.artist}`);


    const buttonTancar: HTMLButtonElement = document.createElement('button');
    buttonTancar.innerHTML = 'x';
    
    
    clickTitle.addEventListener("click",
        () => {
            titleTd.appendChild(ListClick);
            titleTd.appendChild(buttonTancar);

            if (buttonTancar) {
                buttonTancar.addEventListener("click",
                    () => {
                        buttonTancar.hidden = true

                        ListClick.innerHTML = "";
                    }
                );
            }

        }
    );


    const duration: HTMLTableCellElement = document.createElement("td");
    duration.innerHTML = track.duration.toString();


    titleTd.appendChild(clickTitle);
    tr.appendChild(titleTd);
    tr.appendChild(duration);

    return tr;
}