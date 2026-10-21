interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;
}

interface Track {
    title: string;
    duration: Temps;
}

interface Temps {
    minuts: number;
    segons: number;
}

const cancons: Canco[] = [
    {
        id: "2B-CA",
        titol: "HO MY GOOD",
        artista: "U2",
        durada: 90
    },
    {
        id: "2B-CA",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 190
    },
    {
        id: "2B-CA",
        titol: "Manolete",
        artista: "Michael Jackson",
        durada: 120
    },
    {
        id: "2B-CA",
        titol: "Pepinillo",
        artista: "Michael Jackson",
        durada: 190
    }
];

function convertirTemps(temps: number): Temps {
    return {
        minuts: Math.floor(temps / 60),
        segons: temps % 60
    };
}

const tracks: Track[] = cancons.map(
    (c: Canco) => {
        return {
            title: c.titol,
            duration: convertirTemps(c.durada)
        }
    }
)

tracks.forEach(
    (t: Track) => { console.log(t); }
);

const canconsString: string[] = cancons.map(
    (c: Canco) => {
        let minuts = Math.floor(c.durada / 60);
        let segons = c.durada % 60;
        let text: string = `${c.titol} (${c.artista} - Temps: ${minuts}  ${segons})`;
        return text.trim();

    });


