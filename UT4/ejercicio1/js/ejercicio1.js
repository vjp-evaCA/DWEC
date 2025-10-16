var persona = {
    nombre: "Marta",
    edad: 23,
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
    getInfo(){
        let info = "Mi nombre es " + this.nombre + " y tengo " + this.edad + "\n";

        this.trabajos.forEach(function(trabajo){
            info += "-" + trabajo.descripcion + " --> " + trabajo.duracion + "\n";
        });
        return info;
    }
};

console.log(persona.getInfo());