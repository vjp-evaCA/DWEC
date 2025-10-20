const discoMusica = {
    titulo: "Thriller",
    autor: "Michael Jackson",
    annoPublicacion: 1982,
    numeroVentas: 70000000,
    getInfoDisco: function () {
        return "Título: " + this.titulo + "\n" +
            "Autor: " + this.autor + "\n" +
            "Año de publicación: " + this.annoPublicacion + "\n" +
            "Número de ventas: " + this.numeroVentas;
    }
};

const calleCiudad = {
    nombre: "Gran Vía",
    longitud: 1500,
    nombreEstablecimientos: ["Restaurante El Buen Sabor", "Librería Central", "farmacia 24h"],
    getInfoCalle: function () {
        return "Nombre: " + this.nombre + "\n" +
            "Longitud de la calle: " + this.longitud + "\n" +
            "Lista de establecimientos: " + this.nombreEstablecimientos;
    }
};

const coche = {
    modelo: "Mondeo",
    duenno: {
        nombre: "Eva",
        edad: 19
    },
    marca: {
        nombre: "Ford",
        annoCreacion: 1903
    },
    getInfoCoche: function () {
        return "Modelo: " + this.modelo + "\n" +
            "Dueño: " + this.duenno.nombre + " (" + this.duenno.edad + " años) " + "\n" +
            "Marca: " + this.marca.nombre + " (creada en " + this.marca.annoCreacion + ")";
    }
};

const obraTeatro = {
    tituloObra: "la casa de Bernarda Alba",
    fechaEstreno: "08-03-1945",
    director: {
        nombre: "Pedro",
        apellidos: "Vargas López",
        nacimiento: 1975,
        listaTitulosObras: ["Hamlet", "Don Juan Tenorio", "Bodas de sangre"]
    },
    listaActores: [{
        nombre: "María",
        edad: 28,
        numeroVecesRepresentadoActuacion: 15
    },
{
        nombre: "Carlos",
        edad: 35,
        numeroVecesRepresentadoActuacion: 22
    },
{
        nombre: "Laura",
        edad: 31,
        numeroVecesRepresentadoActuacion: 18
    }],
    getInfoObraTeatro: function(){
        let infoActores = "";
        for (let i = 0; i < this.listaActores.length; i++){
            infoActores += "\n- " + this.listaActores[i].nombre + 
                          " (" + this.listaActores[i].edad + " años)" +
                          " - Representado " + this.listaActores[i].numeroVecesRepresentadoActuacion + " veces";
        }

        return "Título de la obra: " + this.tituloObra + "\n" +
        "Fecha de estreno: " + this.fechaEstreno + "\n" +
        "Director: " + this.director.nombre + " " + this.director.apellidos + " (nacido en " + this.director.nacimiento + ")" + "\n" + "Obras del director: " + this.director.listaTitulosObras.join(", ") + "\n" +
        "Lista de actores: " + infoActores;
    }
};

// Mostrar información por consola
console.log("=== DISCO DE MÚSICA ===");
console.log(discoMusica.getInfoDisco());

console.log("\n=== CALLE ===");
console.log(calleCiudad.getInfoCalle());

console.log("\n=== COCHE ===");
console.log(coche.getInfoCoche());

console.log("\n=== OBRA DE TEATRO ===");
console.log(obraTeatro.getInfoObraTeatro());