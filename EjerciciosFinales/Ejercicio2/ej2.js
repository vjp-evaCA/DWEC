function compararCadenas(cadena1, cadena2) {
    if (typeof cadena1 !== "string" || typeof cadena2 !== "string") {
        console.log("Error: ambas cadenas deben ser de texto");
        return;
    }

    if(cadena1 == cadena2.split().reverse().join()){
        console.log("La segunda cadena del revés es igual que la primera cadena del derecho.");
    }else if (cadena2 == cadena1.split().reverse().join()){
        console.log("La primera cadena del revés es igual que la segunda cadena del derecho.");
    }else{
        console.log("No son iguales.")
    }
}

//Ejemplo con dos cadenas de texto
console.log("Hola", "Adiós");
compararCadenas("Hola", "Adiós");

//Ejemplo con un número y una cadena de texto
console.log(273,"Hola");
compararCadenas(273,"Hola");

//Ejemplo de dos cadenas de texto con la misma longitud
console.log("Ana","Ana");
compararCadenas("Ana","Ana");
