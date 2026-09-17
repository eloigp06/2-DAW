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