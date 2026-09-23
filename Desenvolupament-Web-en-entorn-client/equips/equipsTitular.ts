interface Jugador{
    nom: string;
    titular: boolean
}

interface Equip{
    nomEquip: string;
    jugadors: Jugador[];
}

const equips: Equip[] = [
    {
        nomEquip: "FC Barcelona",
        jugadors: [
            { nom: "Ter Stegen", titular: true },
            { nom: "Pedri", titular: true },
            { nom: "Ferran Torres", titular: false }
        ]
    },
    {
        nomEquip: "Girona FC",
        jugadors: [
            { nom: "Gazzaniga", titular: true },
            { nom: "Yangel Herrera", titular: false },
            { nom: "Tsygankov", titular: true }
        ]
    }
];


function obtenirTitulars(titulars: Equip[], titular: boolean): Equip[] {
    return titulars.map(
        (e: Equip) => {}
    )
}
