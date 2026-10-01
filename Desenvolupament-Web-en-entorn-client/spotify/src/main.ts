import './style.css'
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/crearTitol';
import { crearTableSegons } from './view/tableSongs/crearTableSongs';
import { llistaCancons } from './view/tableSongs/llistaCancons';
import type { Track } from './interfaces/track';
import { tracks } from './data/track';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;

const tbody: HTMLTableSectionElement = document.createElement("tbody");



const selectCanco: HTMLDivElement = document.createElement("div");



const selectSong = (track: Track): void => {
    selectCanco.textContent = ""
    const selectText: HTMLParagraphElement = document.createElement("p")

    const selectX: HTMLButtonElement = document.createElement("button")
    selectX.type = "button"
    selectX.textContent = "x";

    selectText.textContent = ` Canço: ${track.title} - Artista: ${track.artist}`
    selectCanco.appendChild(selectText)
    selectCanco.appendChild(selectX)
    selectX.addEventListener("click", () =>
        selectCanco.textContent = ""
    )

}


const cerca: (idTrack: string) => void =
    (searchText: string) => {

        const searchResult: Track[] = tracks.filter(
            (t: Track) => {
                return t.title.includes(searchText);
            })
        if (searchResult.length > 0) {
            tbody.innerHTML = "";
            llistaCancons(searchResult, tbody, selectSong);
        }

    }

appObj.appendChild(crearTitol());
appObj.appendChild(crearCerca(cerca));
appObj.appendChild(crearTableSegons(tbody, selectSong));
appObj.appendChild(selectCanco)

