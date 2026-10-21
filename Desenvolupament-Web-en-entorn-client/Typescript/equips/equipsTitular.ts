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
            { nom: "Rodri", titular: false }
        ]
    },
    {
        nomEquip: "Girona FC",
        jugadors: [
            { nom: "Gazzaniga", titular: true },
            { nom: "Sergi Puig", titular: false },
            { nom: "Paulo", titular: true }
        ]
    }
];

const nomEquip: string = "Girona FC"
const jugadorsTitulars: Jugador[] = equipTitular(equips,nomEquip)

function equipTitular(equips: Equip[], nomEquip: string): Jugador[] {
    const equipTrobat:Equip | undefined = equips.find(
        (e: Equip) =>  { 
            return e.nomEquip === nomEquip
        }
    );
    
    if (!equipTrobat) {
        return [];
    }

    return equipTrobat.jugadors.filter( 
        (j: Jugador) => { 
            return j.titular
        }
    );
}
console.log(jugadorsTitulars);