interface Canco {
    titol: string;
    artista: string;
    durada: number;
    ID: string;
}

interface LlistesReproduccions {
    nom: string;
    idLlista: string;
    llistaCancons: Canco[];
}

interface Usuari {
    idUsuari: string;
    idLlista: string;
    llistes: LlistesReproduccions[];
}


function imprimir(canco: Canco): void {
    if (canco !== null) {
        console.log("Existeix")
    } else {
        console.log("No Existeix")
    }
};

const cancons: Canco[] = [
    {
        ID: "2B-CA",
        titol: "HO MY GOOD",
        artista: "U2",
        durada: 90
    },
    {
        ID: "2B-CA",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 120
    },
    {
        ID: "2B-CA",
        titol: "Billie Jean",
        artista: "Michael Jackson",
        durada: 190
    },
    {
        ID: "2B-CA",
        titol: "Beat it",
        artista: "Michael Jackson",
        durada: 156
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Wake Me Up",
        artista: "Avicii",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Levels",
        artista: "Avicii",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "The Nights",
        artista: "Avicii",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Hey Brother",
        artista: "Avicii",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Waiting for Love",
        artista: "Avicii",
        durada: 178
    },
    {
        ID: "2B-CA",
        titol: "Without You",
        artista: "Avicii",
        durada: 178
    }
]
const usuaris: Usuari[] = [
  {
    idUsuari: "fX001",
    idLlista: "L001",
    llistes: [
      {
        nom: "Hits 80s & Pop",
        idLlista: "L001",
        llistaCancons: cancons
      }
    ]
  }
];
let artista: string = "Avicii";
let idUsuari: string = "fX001";
let idLlista: string = "Aw0@pep";

const ObtenirLlistes = (usuaris: Usuari[], idLlista: string, idUsuari: string, artista: string): Canco[] => {
    const usuarisFiltrats = usuaris.filter((u: Usuari) => u.idUsuari == idUsuari);
    if (usuarisFiltrats.length == 0) {
        return [];
    }
    const llistesFiltrades = usuarisFiltrats[0].llistes.filter(
        (l: LlistesReproduccions) => l.idLlista == idLlista
    );
    if (llistesFiltrades.length == 0) {
        return [];
    };

    return llistesFiltrades[0].llistaCancons.filter(
        (c: Canco) => c.artista == artista);
}

export { }