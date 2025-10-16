function arrays(...elementos) {
    let numeros = 0;
    let cadenas = 0;
    let otros = 0;

    elementos.forEach(elemento => {
        if(typeof elemento === "number"){
            numeros++;
            console.log("Número:" + elemento);
        }else if(typeof elemento === "string"){
            cadenas++;
            console.log("Cadena:" + elemento);
        }else{
            otros++;
            console.log("Otro tipo:" + elemento);
        }
    });

    console.log("Cantidad de números: " + numeros);
    console.log("Cantidad de cadenas: " + cadenas);
    console.log("Cantidad de otros tipos: " + otros);
    

}

//Ejemplo con dos cadenas de texto
console.log("===== Ejemplo 1 =====");
arrays("Hola", "Adiós");

//Ejemplo con un número y una cadena de texto
console.log("===== Ejemplo 2 =====");
arrays(273, "Adiós");

//Ejemplo de una cadenas de texto y un booleano
console.log("===== Ejemplo 3 =====");
arrays("Ana", false);