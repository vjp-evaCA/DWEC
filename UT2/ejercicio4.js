let cadena = prompt("Introduce una cadena de texto");
function contar(cadena) {
    console.log(cadena.length);
    console.log(cadena.search(/[aeiou]/));
    if (cadena.startsWith("A")) {
        console.log("La cadena empieza por A");
    } else {
        console.log("La cadena no empieza por A");
    }
}
contar(cadena);