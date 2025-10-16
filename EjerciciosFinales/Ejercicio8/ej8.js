/*
Crea una función procesarArray que realice los siguientes pasos:
a) Checkea que todos los elementos son de tipo número. Si no,termina con alert("Error").
b) En caso afirmativo modifica el valor del array multiplicando cada elemento por 2. (se debe almacenar sobre el mismo array).
c) Por último comprueba que todos los elementos son pares. Si es así muestra un mensaje por pantalla de éxito, en caso contrario, de error.
*/

function procesarArray(array) {
    if (!array.every(elemento => typeof elemento === "number")) {
        alert("ERROR");
        return;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] *= 2;
    }

    if (array.every(elemento => elemento % 2 === 0)) {
        console.log("¡ ÉXITO !");
    } else {
        console.log("ERROR");
    }
}

// ---- PRUEBAS ----
procesarArray([1, "hola", 3]);
procesarArray([2, 4, 6, 8]);
