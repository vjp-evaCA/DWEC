// Utiliza la función every para comprobar que todos los elementos de un array son pares.

let array = [2,4,6,8,0];
console.log("Array: " + array);
console.log("- Ejemplo para ver si son pares -")
console.log(array.every(numero => numero % 2 == 0));
console.log("- Ejemplo para ver si son impares -")
console.log(array.every(numero => numero % 2 == 1));