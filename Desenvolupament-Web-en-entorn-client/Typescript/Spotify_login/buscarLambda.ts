interface Canco {
    titol: string;
    artista: string;
    durada: number;
    ID: string;
}
const cancoABuscar: Canco = {
    ID: "2B-CA",
    titol: "HO MY GOOD",
    artista: "U2",
    durada: 90
};

function imprimir(canco:Canco): void{
    if(canco !== null){
        console.log("Existeix")
    } else{
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
        durada: 190
    }
]
let titol: string = "Chicago"
const  songsSearch:Canco[] = cancons.filter(
    ( c: Canco) => {
        return c.titol == titol && c.durada > 120;
    }
);
console.log(songsSearch)
export{}

