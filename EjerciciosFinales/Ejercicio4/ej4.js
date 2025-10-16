function convertirEntradas(...elementos){
    let producto = "Producto genérico";
    let precio = 100;
    let impuestos = 21;

    elementos.forEach((elemento, index) => {
        if(typeof elemento !== "string"){
            elemento = String(elemento);
        }
        console.log(`Elemento ${index + 1}: "${elemento}" (tipo: ${typeof elemento})`);
    });

    let precioFinal = precio + (precio * impuestos / 100);
    console.log(`\n${producto} tiene un precio base de ${precio} y con impuestos`)
}

convertirEntradas("Zapato", 50, true, null, {nombre: "Juan"});