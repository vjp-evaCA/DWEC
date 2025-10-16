// Definición del objeto persona con sus propiedades y métodos
var persona = {
    // Información básica de la persona
    nombre: "Marta",
    edad: 23,
    
    // Array que contiene el historial laboral como objetos
    trabajos: [
        {
            descripcion: "Payaso del circo",
            duracion: "2003-2005"
        },
        {
            descripcion: "Sexador de pollos",
            duracion: "2005-2015"
        }
    ],
    
    // Método que genera y devuelve la información
    getInfo(){
        // Construimos el encabezado con nombre y edad
        let info = "Mi nombre es " + this.nombre + " y tengo " + this.edad + "\n";

        // Recorremos cada trabajo en el array 'trabajos' y mostramos su descripción y duración
        this.trabajos.forEach(function(trabajo){
            info += "-" + trabajo.descripcion + " --> " + trabajo.duracion + "\n";
        });
        
        // Devolvemos la cadena completa con toda la información
        return info;
    }
};

// Ejecutamos el método y mostramos el resultado
console.log(persona.getInfo());