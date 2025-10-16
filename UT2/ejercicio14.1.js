let str = "ab1c3de4fg";
let vocales = "";
let consonantes = "";

for (let letra of str){
    if ("aeiou".includes(letra)){
        vocales += letra;
    }else if(letra >= 'a' && letra <= 'z'){
        consonantes += letra;
    }
}

console.log("Vocales: " + vocales);
console.log("Consonantes: " + consonantes);