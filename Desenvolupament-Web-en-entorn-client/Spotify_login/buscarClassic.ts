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

function imprimirArray(cancons:Canco[]):void{
    for(let i: number = 0; i<cancons.length; i++){
        imprimir(cancons[i]);
    }
}

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



// function buscarCanco(titol: string, cancoList: Canco[]): Canco | null {
//     const totalCancons:number = cancoList.length -1;
//     let i: number = 0;
//     let noTrobat: boolean = true;
//     while (i<totalCancons && titol !== cancoList[i].titol){
//         i++;
//     }
//     if ( titol == cancoList[i].titol){
//         return cancoList[i];
//     } else{
//         return null;
//     }
// }
function buscarCancoDurada(durada: number, cancoList: Canco[]): Canco[] {
    const totalCancons:number = cancoList.length;

    const canconsLlargues:Canco[] = [];
    for (let i:number = 0; i<totalCancons; i++){
        if (cancoList[i].durada >durada){
            canconsLlargues.push(cancoList[i]);
        }
    }
    return canconsLlargues;
}
const canconsLl:Canco[] = buscarCancoDurada(30,cancons)
imprimirArray(canconsLl);

// let existeixCanco:Canco  | null = buscarCanco(cancoABuscar.titol,cancons);
// imprimir(existeixCanco!);

// existeixCanco = buscarCanco("Chicago", cancons);
// imprimir(existeixCanco!);

// existeixCanco = buscarCanco ("NoChicako", cancons)