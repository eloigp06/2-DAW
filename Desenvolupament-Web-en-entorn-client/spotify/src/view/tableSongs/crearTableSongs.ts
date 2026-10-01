import { tracks } from "../../data/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";
import  type { Track } from "../../interfaces/track";

export function crearTableSegons(tbody: HTMLTableSectionElement, Select: (track: Track) => void
): HTMLTableElement {


    const table: HTMLTableElement = document.createElement("table");
    table.appendChild((createTableHead()));


    llistaCancons(tracks, tbody, Select);


    table.appendChild(tbody);
    return table;
}