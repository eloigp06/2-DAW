function validator(): boolean{
  const nom: string = "Paolo";
  const correu: string = "Paolo123@gmail.com"
  const edat: number = 12;

  if (nom == "" || nom != nom){
    return false;
  }
  if (correu != correu  || correu == ""){
    return false;
  }
  if (edat < 14){
    return false;
  }
  return true;
}
console.log(validator());

// Opcio interface
// interface Usuari{
//   password: string;
//   correu: string;
//   edat: number;
// };

// function auntentificatdor(Usuari: Usuari): boolean{
//   let correcte:boolean = false;
//   if(Usuari.correu == "correuOK" &&  Usuari.password == "passwordOK" && Usuari.edat > 14){
//     correcte = true;
//   }
//   return correcte;
// }
// const usercorrecte:Usuari = {
//   password: "passwordOK",
//   correu: "correuOK",
//   edat: 15
// }
// console.log(auntentificatdor(usercorrecte))