export function createTableHead():HTMLTableSectionElement{
const thead: HTMLTableSectionElement = document.createElement("thead");
const trHead: HTMLTableRowElement = document.createElement("tr");
const thTitol: HTMLTableCellElement = document.createElement("th");
const thDurada:HTMLTableCellElement =document.createElement("th");
const thReproductions: HTMLTableCellElement = document.createElement("th");
const thPlayButton : HTMLTableCellElement = document.createElement("th")

thTitol.textContent = "Titol";
thDurada.textContent = "Durada";
thReproductions.textContent = "Reproduccions";
thPlayButton.textContent = "Play"



trHead.appendChild(thTitol);
trHead.appendChild(thDurada);
thead.appendChild(trHead);
trHead.appendChild(thReproductions);
trHead.appendChild(thPlayButton)
return thead;
};
