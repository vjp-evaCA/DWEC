function compararCadenas(cadena1, cadena2) {
    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        console.log("Error: ambas cadenas deben ser de texto");
        return;
    }

    if(cadena1.length < cadena2.length){
        console.log("La cadena más corta es: " + cadena1)
    }else if (cadena2.length < cadena1.length){
        console.log("La cadena más corta es: " + cadena2);
    }else{
        console.log("Ambas cadenas de texto tienen la misma longitud.")
    }
}

//Ejemplo con dos cadenas de texto
console.log("Hola", "Adiós");
compararCadenas("Hola", "Adiós");

//Ejemplo con un número y una cadena de texto
console.log(273,"Hola");
compararCadenas(273,"Hola");

//Ejemplo de dos cadenas de texto con la misma longitud
console.log("casa","gato");
compararCadenas("casa","gato");

