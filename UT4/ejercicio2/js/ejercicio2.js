let monumento = {
    "uri": {
        "type": "uri",
        "value": "http://opendata.caceres.es/recurso/turismo/monumentos/Monumento/54-palacio-de-los-saavedra"
    },
    "geo_long": {
        "type": "typed-literal",
        "datatype": "http://www.w3.org/2001/XMLSchema#double",
        "value": "-6.37144"
    },
    "geo_lat": {
        "type": "typed-literal",
        "datatype": "http://www.w3.org/2001/XMLSchema#double",
        "value": "39.4735"
    },
    "clase": {
        "type": "typed-literal",
        "datatype": "http://www.w3.org/2001/XMLSchema#string",
        "value": "PALACIO "
    },
    "rdfs_label": {
        "type": "typed-literal",
        "datatype": "http://www.w3.org/2001/XMLSchema#string",
        "value": "Palacio de los Saavedra"
    },
    "tieneEnlaceSIG": {
        "type": "typed-literal",
        "datatype": "http://www.w3.org/2001/XMLSchema#string",
        "value": "http://sig.caceres.es/serweb/fichasig/fichatoponimia.php?mslink=1226 "
    }
};

console.log("El nombre del monumento es " + monumento.rdfs_label.value);
console.log("El tipo de monumento es: " + monumento.clase.value);

// Función pintarInfo 
monumento.pintarInfo = function () {
    let info = "INFORMACIÓN DEL MONUMENTO:\n";
    info += "Nombre: " + this.rdfs_label.value + "\n";
    info += "Tipo: " + this.clase.value + "\n";  
    info += "Latitud: " + this.geo_lat.value + "\n";
    info += "Longitud: " + this.geo_long.value + "\n";
    info += "URI: " + this.uri.value;
    return info;
};

console.log(monumento.pintarInfo());