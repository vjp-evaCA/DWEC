// Pedir al usuario que introduzca tres números por pantalla
let num1 = parseInt(prompt("Introduce el primer número:"));
let num2 = parseInt(prompt("Introduce el segundo número:"));
let num3 = parseInt(prompt("Introduce el tercer número:"));

console.log("Los números introducidos son:", num1, num2, num3);

let suma = num1 + num2 + num3;

if (suma == 100) {
    alert("¡Enhorabuena!");
} else {
    alert("Lo siento, la suma no es 100.");
}