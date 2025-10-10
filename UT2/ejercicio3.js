let segundos = 3;
let milisegundos = segundos * 1000;
let nombre = prompt("Introduce un nombre ");


setTimeout(function() {
    console.log("Hola, " + nombre);
}, milisegundos);