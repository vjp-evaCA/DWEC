let array = [2,3,4,5];
console.log(array.join("#"));

array.unshift(0,1);
console.log(array.join("#"));

array.push(6,7,8);
console.log(array.join("#"));

array.splice(3,3);
console.log(array.join("#"));

array.splice(array.length - 1, 0, 9, 10);
console.log(array.join("#"));





/*
Crea un array con 4 valores y realiza los siguientes pasos:
1) Añade dos elementos al inicio.
2) Añade 3 más al final.
3) Elimina las posiciones 3,4,5
4) Inserta 2 elementos antes del último elemento.

NOTA: En cada cambio muestra los elementos del array separados por un # utilices bucles, utiliza las funciones predefinidas de arrays.
*/
