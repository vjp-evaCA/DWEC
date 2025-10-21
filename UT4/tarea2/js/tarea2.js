// CLASE Trabajador 
class Trabajador {
    // CONSTRUCTOR - Inicializa las propiedades del trabajador
    constructor(nombre, numHorasSemanales, salarioPorHora) {
        this.nombre = nombre;                      
        this.numHorasSemanales = numHorasSemanales; 
        this.salarioPorHora = salarioPorHora;      
    }

    // Muestra toda la información del trabajador
    pintarInfo() {
        console.log("Nombre: " + this.nombre);
        console.log("Número de horas semanales: " + this.numHorasSemanales);
        console.log("Salario por hora: " + this.salarioPorHora);
        console.log("Salario semanal: " + (this.numHorasSemanales * this.salarioPorHora) + " euros");
        console.log("-----------------------------");  // Línea para mejor legibilidad
    }

    // Calcula y devuelve el salario semanal
    getSaldoSemanal() {
        return this.numHorasSemanales * this.salarioPorHora;  
    }
}

// Cración de dos trabajadores de ejemplo
const trabajador1 = new Trabajador("Ana", 40, 12);   
const trabajador2 = new Trabajador("Luis", 35, 15);  

// Probamos los métodos de mostrar información de los trabajadores
trabajador1.pintarInfo();  
trabajador2.pintarInfo();  

// Usamos el método para obtener el salario semanal
console.log("Ana gana " + trabajador1.getSaldoSemanal() + " euros a la semana.");
console.log("Luis gana " + trabajador2.getSaldoSemanal() + " euros a la semana.");

// CLASE Restaurante
class Restaurante {
    // CONSTRUCTOR - Inicializa las propiedades del restaurante
    constructor(nombre) {
        this.nombre = nombre;              
        this.trabajadores = [];            // Array vacío para almacenar trabajadores
    }

    // Añade un trabajador al array del restaurante
    anadirTrabajador(trabajador) {
        this.trabajadores.push(trabajador);  
    }

    // Muestra información completa del restaurante y sus trabajadores
    pintarInfo() {
        console.log("\n\nINFORMACIÓN DEL RESTAURANTE " + this.nombre);  
        
        // Si no hay trabajadores, muestra ese mensaje
        if (this.trabajadores.length === 0) {
            console.log("No hay trabajadores.");
            return;  
        }

        // Itera sobre cada trabajador para mostrar su información
        this.trabajadores.forEach((trabajador, index) => {
            console.log("Trabajador " + (index + 1) + ":");  
            console.log("El nombre del trabajador es: " + trabajador.nombre);
            console.log("El número de horas semanales: " + trabajador.numHorasSemanales);
            console.log("El precio/hora: " + trabajador.salarioPorHora);
            console.log("-----------------------------------------");  // Separador entre trabajadores
        });
    }

    // Calcula el costo total semanal de todos los trabajadores
    getPagosSemanales() {
        let total = 0;  

        // Suma el salario semanal de cada trabajador
        this.trabajadores.forEach(trabajador => {
            total += trabajador.getSaldoSemanal(); 
        });
        
        return total;  
    }
}

// Crear tres trabajadores para el restaurante
const trabajadorA = new Trabajador("Marta", 30, 10);   
const trabajadorB = new Trabajador("Jorge", 40, 12);   
const trabajadorC = new Trabajador("Sofía", 25, 15);   

// Creamos un restaurante
const miRestaurante = new Restaurante("El Buen Comer");

// Añadir los trabajadores al restaurante
miRestaurante.anadirTrabajador(trabajadorA);
miRestaurante.anadirTrabajador(trabajadorB);
miRestaurante.anadirTrabajador(trabajadorC);

// Mostrar información del restaurante y sus empleados
miRestaurante.pintarInfo();

// Mostrar el costo total de nóminas
console.log("Mantener a los trabajadores del restaurante cuesta: " + miRestaurante.getPagosSemanales() + " euros.");