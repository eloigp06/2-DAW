# Enunciat
Una plataforma de venda en línia vol mostrar quant de temps trigarà a rebre la seva comanda, la funció rebre un llistat del producte que hi ha en el carro de la compra on cada producte tindrà un preu estimat de preparació que dependrà del proveïdor i el tipus d'enviament seleccionat l'exprés que rebrà la comanda en un temps concret i l'estàndard que dependrà dels productes, tot i que les dades provenen de les vases de dades no és 100% fiable.

La implementació de la funció en TypeScript la 1a i subseqüents. Un breu comentari/justificació al codi on s'expliqui al codi les decisions preses davant dels casos ambigus o dades incoherents. Procediment que s'ha seguit per  arribar a la conclusió final

Nom d'el document
Estimador de tems Enciament.md

``` ts
type TipusEnviament = 'expres' | 'estandard';

interface Producte {
  id: string;
  nom: string;
  tempsPreparacioDies: number;
}

interface EstimacioEntrega {
  diesMinims: number;
  diesMaxims: number;
  avísFiabilitat: string;
}
function calcularTempsEntrega(carro: Producte[], enviament: TipusEnviament): EstimacioEntrega {
  const avis = "Nota: Els temps són estimats i poden variar lleugerament respecte a les dades del proveïdor.";

  if (carro.length === 0) {
    return { diesMinims: 0, diesMaxims: 0, avísFiabilitat: "El carro està buit." };
  }

  if (enviament === 'expres') {

    return {
      diesMinims: 1,
      diesMaxims: 2,
      avísFiabilitat: avis
    };
  }

  let maxTempsPreparacio = 0;
  for (const producte of carro) {
    if (producte.tempsPreparacioDies > maxTempsPreparacio) {
      maxTempsPreparacio = producte.tempsPreparacioDies;
    }
  }

  const diesMinims = maxTempsPreparacio + 2;
  const diesMaxims = maxTempsPreparacio + 5;

  return {
    diesMinims,
    diesMaxims,
    avísFiabilitat: avis
  };
}

const elMeuCarro: Producte[] = [
  { id: "p1", nom: "Llibre de TypeScript", tempsPreparacioDies: 1 },
  { id: "p2", nom: "Funda de portàtil (Proveïdor extern)", tempsPreparacioDies: 4 },
  { id: "p3", nom: "Ratolí sense fils", tempsPreparacioDies: 2 }
];

console.log("--- Enviament Exprés ---");
const estimacioExpres = calcularTempsEntrega(elMeuCarro, 'expres');
console.log(`Rebràs la comanda entre ${estimacioExpres.diesMinims} i ${estimacioExpres.diesMaxims} dies.`);
console.log(estimacioExpres.avísFiabilitat);

console.log("\n--- Enviament Estàndard ---");
const estimacioEstandard = calcularTempsEntrega(elMeuCarro, 'estandard');
console.log(`Rebràs la comanda entre ${estimacioEstandard.diesMinims} i ${estimacioEstandard.diesMaxims} dies.`);
console.log(estimacioEstandard.avísFiabilitat);
```

## Codi contre errors
he indicat que el números no puguin ser negatius, ni nulls, les dates han de ser lògiques i raonables i han de ser número introduïts com a tal no entre""
```ts
type TipusEnviament = 'expres' | 'estandard';

interface Producte {
  id: string;
  nom: string;
  tempsPreparacioDies: number;
}

interface EstimacioEntrega {
  diesMinims: number;
  diesMaxims: number;
  avísFiabilitat: string;
}

// Definim un límit de temps lògic. Cap producte hauria de trigar més d'això en preparar-se.
const MAX_DIES_PREPARACIO_PERMESOS = 60; 

/**
 * Valida que un producte tingui el format correcte i valors lògics.
 * Utilitzem "any" perquè les dades de la base de dades podrien no complir la interfície.
 */
function validarProducte(producte: any): void {
  // 1. Comprovem que no sigui null o undefined
  if (!producte || typeof producte !== 'object') {
    throw new Error(`S'ha trobat un element invàlid al carro: no és un objecte.`);
  }

  // 2. Comprovem els textos (strings) perquè no estiguin buits o sense cometes
  if (typeof producte.id !== 'string' || producte.id.trim() === '') {
    throw new Error(`El producte no té un ID vàlid o està buit.`);
  }
  if (typeof producte.nom !== 'string' || producte.nom.trim() === '') {
    throw new Error(`El producte amb ID "${producte.id}" no té un nom vàlid.`);
  }

  // 3. Comprovem que el temps de preparació sigui un número real
  if (typeof producte.tempsPreparacioDies !== 'number' || isNaN(producte.tempsPreparacioDies)) {
    throw new Error(`El producte "${producte.nom}" té un temps de preparació que no és un número.`);
  }

  // 4. Comprovem els límits lògics (ni negatius, ni milers d'anys)
  if (producte.tempsPreparacioDies < 0) {
    throw new Error(`El producte "${producte.nom}" té un temps de preparació negatiu (${producte.tempsPreparacioDies} dies).`);
  }
  if (producte.tempsPreparacioDies > MAX_DIES_PREPARACIO_PERMESOS) {
    throw new Error(`El producte "${producte.nom}" excedeix el límit lògic de preparació (${MAX_DIES_PREPARACIO_PERMESOS} dies màxim).`);
  }
}

/**
 * Calcula el temps estimat de l'entrega d'una comanda amb validacions estrictes.
 */
function calcularTempsEntrega(carro: any[], enviament: TipusEnviament): EstimacioEntrega {
  const avis = "Nota: Els temps són estimats i poden variar lleugerament respecte a les dades del proveïdor.";

  // Comprovem que el carro existeixi i sigui una llista (Array)
  if (!carro || !Array.isArray(carro)) {
    throw new Error("Les dades del carro de la compra són invàlides o nul·les.");
  }

  if (carro.length === 0) {
    return { diesMinims: 0, diesMaxims: 0, avísFiabilitat: "El carro està buit." };
  }

  // Validem tots els productes abans de fer cap càlcul
  for (const producte of carro) {
    validarProducte(producte);
  }

  if (enviament === 'expres') {
    return { diesMinims: 1, diesMaxims: 2, avísFiabilitat: avis };
  }

  let maxTempsPreparacio = 0;
  for (const producte of carro) {
    if (producte.tempsPreparacioDies > maxTempsPreparacio) {
      maxTempsPreparacio = producte.tempsPreparacioDies;
    }
  }

  return {
    diesMinims: maxTempsPreparacio + 2,
    diesMaxims: maxTempsPreparacio + 5,
    avísFiabilitat: avis
  };
}

// --- Exemple d'ús amb dades errònies simulades ---

const carroAmbErrors = [
  { id: "p1", nom: "Llibre", tempsPreparacioDies: 1 },
  { id: "p2", nom: "Ordinador Quàntic", tempsPreparacioDies: 3650000 }, // Temps absurd!
  null // Element nul infiltrat
];

try {
  console.log("Intentant calcular l'enviament...");
  const estimacio = calcularTempsEntrega(carroAmbErrors, 'estandard');
  console.log(estimacio);
} catch (error) {
  // Aquí capturem l'error perquè l'aplicació no peti i puguem avisar a l'usuari
  if (error instanceof Error) {
    console.error("❌ Error processant la comanda:", error.message);
  }
}
```