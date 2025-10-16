function ordenarArray(array) {
let copiaArray = array.slice();
let longitudCopiaArray = copiaArray.length;

for(let i = 0; i < longitudCopiaArray -1; i++){
    for(let j = 0; j < longitudCopiaArray -1 -i; j++){
        if(copiaArray[j] > copiaArray[j + 1]) {
            let temporal = copiaArray[j];
            copiaArray[j] = copiaArray[j + 1];
            copiaArray[j + 1] = temporal;
        }
    }
}
return copiaArray;

}

console.log("==== Ejemplo =====");
console.log(ordenarArray([5,2,9,1,7]));

/*
Crea una función que dado un array lo ordene. Intenta hacer un método para ordenarlo por ti mismo considerando que el array siempre incluyese números (sin usar .sort()).
*/

