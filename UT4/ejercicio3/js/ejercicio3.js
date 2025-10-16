// Clase padre CicloMotor
class CicloMotor {
    // Constructor que inicializa los atributos
    constructor(marca, aceleracion, desaceleracion) {
        this.numRuedas = 2;                    // Todos los ciclomotores tienen 2 ruedas
        this.velocidadMaxima = 120;            // Velocidad máxima por defecto 120 km/h
        this.velocidadActual = 0;              // Velocidad inicial en 0 km/h
        this.marca = marca;                    
        this.aceleracion = aceleracion;         
        this.desaceleracion = desaceleracion;  
        this.encendida = false;                // Estado del motor (apagada inicialmente)
    }

    // Método para arrancar el ciclomotor
    arrancar() {
        this.encendida = true; // Cambia el estado a encendido
        console.log("Se introduce la llave y se gira, la moto arranca.");
    }

    // Método para aumentar la velocidad actual
    acelerar() {
        // Solo se puede acelerar si la moto está encendida
        if (this.encendida) {
            this.velocidadActual = this.velocidadActual + this.aceleracion;

            // Control para no superar la velocidad máxima
            if (this.velocidadActual > this.velocidadMaxima) {
                this.velocidadActual = this.velocidadMaxima; // Limita a velocidad máxima
            }
        }
        // Si está apagada, no hace nada
    }

    // Método para reducir la velocidad actual
    frenar() {
        // Solo se puede frenar si la moto está encendida
        if (this.encendida) {
            this.velocidadActual = this.velocidadActual - this.desaceleracion;

            // Control para que la velocidad no sea negativa
            if (this.velocidadActual < 0) {
                this.velocidadActual = 0; // La velocidad mínima es 0 km/h
            }
        }
    }

    // Método que muestra toda la información del ciclomotor en formato específico
    mostrarInfo() {
        console.log("..... " + this.marca + " ....");        
        console.log("Número de ruedas: " + this.numRuedas);  // Muestra número de ruedas
        console.log("Velocidad máxima: " + this.velocidadMaxima); // Velocidad máxima permitida
        console.log("Velocidad actual: " + this.velocidadActual); // Velocidad en este momento
        console.log("Aceleración: " + this.aceleracion);     // Valor de aceleración
        console.log("Desaceleración: " + this.desaceleracion); // Valor de frenado
        console.log("Encendida: " + (this.encendida ? "Sí" : "No")); // Estado encendido/apagado
    }
}

// ========== PRUEBAS DEL CICLOMOTOR ==========
console.log("\n\nPruebas del ciclomotor\n\n");

// Crear una instancia de CicloMotor
let ciclomotor = new CicloMotor("Kawasaki", 70, 20);

// PRIMERA PRUEBA: Estado inicial de la moto
console.log("LA MOTO INICIALMENTE:");
ciclomotor.mostrarInfo(); 

// SEGUNDA PRUEBA: Intentar acelerar con la moto apagada
console.log("\nLA MOTO TRAS ACELERAR:");
ciclomotor.acelerar(); 
ciclomotor.mostrarInfo(); 

// TERCERA PRUEBA: Arrancar y acelerar una vez
console.log("\nLA MOTO TRAS ARRANCARLA Y ACELERAR:");
ciclomotor.arrancar(); 
ciclomotor.acelerar(); 
ciclomotor.mostrarInfo(); 

// CUARTA PRUEBA: Acelerar por segunda vez
console.log("\nVOLVEMOS A ACELERAR:");
ciclomotor.acelerar(); 
ciclomotor.mostrarInfo(); 

// QUINTA PRUEBA: Frenar la moto
console.log("\nFRENAMOS LA MOTO:");
ciclomotor.frenar();
ciclomotor.mostrarInfo(); 

// Clase hija
class MotoCross extends CicloMotor {
    // Constructor que llama al padre y establece valores
    constructor(marca, aceleracion, desaceleracion) {
        super(marca, aceleracion, desaceleracion);
        this.velocidadMaxima = 90; // Velocidad máxima específica para Motocross
        this.marchaActual = 0;     
    }

    // Sobrescribe el método arrancar con comportamiento específico de MotoCross
    arrancar() {
        console.log("Se levanta la pata de cabra");
        super.arrancar(); 
    }

    // Extiende el método acelerar añadiendo ajuste de marcha
    acelerar() {
        super.acelerar(); 
        this.ajustarMarcha(); 
    }

    // Extiende el método frenar añadiendo ajuste de marcha
    frenar() {
        super.frenar(); 
        this.ajustarMarcha(); 
    }

    // Método específico de MotoCross para ajustar marchas según la velocidad
    ajustarMarcha() {
        if (this.velocidadActual === 0) {
            this.marchaActual = 0;
        } else if (this.velocidadActual > 0 && this.velocidadActual <= 10) {
            this.marchaActual = 1;
        } else if (this.velocidadActual > 10 && this.velocidadActual <= 30) {
            this.marchaActual = 2;
        } else if (this.velocidadActual > 30 && this.velocidadActual <= 50) {
            this.marchaActual = 3;
        } else {
            this.marchaActual = 4; // Para velocidades mayores a 50 km/h
        }
        console.log("Marcha actual: " + this.marchaActual);
    }

    // Muestra la información de MotoCross
    mostrarInfo() {
    console.log("..... " + this.marca + " ....");
    console.log("Número de ruedas: " + this.numRuedas);
    console.log("Velocidad máxima: " + this.velocidadMaxima);
    console.log("Velocidad actual: " + this.velocidadActual);
    console.log("Aceleración: " + this.aceleracion);
    console.log("Desaceleración: " + this.desaceleracion);
    console.log("Encendida: " + (this.encendida ? "Sí" : "No"));
    console.log("Marcha: " + this.marchaActual); // Añadir esta línea
}
}

// PRUEBAS DE MOTOCROSS
console.log("\n\nPruebas de la moto de motocross\n\n");

let motoMotoCross = new MotoCross("Honda", 10, 5);

// PRIMERA PRUEBA: Estado inicial de la moto de motocross
console.log("LA MOTO DE MOTOCROSS INICIALMENTE:");
motoMotoCross.mostrarInfo(); 

// SEGUNDA PRUEBA: Intentar acelerar con la moto apagada
console.log("LA MOTO TRAS ACELERAR:");
motoMotoCross.acelerar();
motoMotoCross.mostrarInfo(); 

// TERCERA PRUEBA: Arrancar y acelerar una vez
console.log("LA MOTO TRAS ARRANCARLA Y ACELERAR:");
motoMotoCross.arrancar(); 
motoMotoCross.acelerar(); 
motoMotoCross.mostrarInfo();

// CUARTA PRUEBA: Acelerar por segunda vez
console.log("VOLVEMOS A ACELERAR:");
motoMotoCross.acelerar(); 
motoMotoCross.mostrarInfo(); 

// QUINTA PRUEBA: Frenar la moto
console.log("FRENAMOS LA MOTO:");
motoMotoCross.frenar(); 
motoMotoCross.mostrarInfo(); 

// Clase hija Scooter que hereda de CicloMotor
class Scooter extends CicloMotor {
    // Constructor que solo recibe la marca
    constructor(marca) {
        // Llama al constructor padre con aceleración fija 25 y desaceleración fija 15
        super(marca, 25, 15);
    }

    // Sobrescribe el método arrancar con comportamiento específico de Scooter
    arrancar() {
        this.encendida = true; // Cambia el estado a encendido
        console.log("Se acerca la llave y se pulsa el botón, la moto arranca");
    }
    
    // Sobrescribe el método mostrarInfo para cambiar el formato visual
    mostrarInfo() {
        console.log("--- " + this.marca + " ---");
        console.log("Número de ruedas: " + this.numRuedas);
        console.log("Velocidad máxima: " + this.velocidadMaxima);
        console.log("Velocidad actual: " + this.velocidadActual);
        console.log("Aceleración: " + this.aceleracion);
        console.log("Desaceleración: " + this.desaceleracion);
        console.log("Encendida: " + (this.encendida ? "Sí" : "No"));
    }
}

// PRUEBAS DE SCOOTER
console.log("\n\nPruebas de la scooter\n\n");

// Crear una instancia de Scooter con marca "Yamaha"
let scooter = new Scooter("Yamaha");

// PRIMERA PRUEBA: Estado inicial de la scooter
console.log("LA MOTO SCOOTER INICIALMENTE:");
scooter.mostrarInfo();

// SEGUNDA PRUEBA: Intentar acelerar con la scooter apagada
console.log("LA MOTO TRAS ACELERAR:");
scooter.acelerar();
scooter.mostrarInfo(); 

// TERCERA PRUEBA: Arrancar y acelerar una vez
console.log("LA MOTO TRAS ARRANCARLA Y ACELERAR:");
scooter.arrancar(); 
scooter.acelerar(); 
scooter.mostrarInfo();

// CUARTA PRUEBA: Acelerar por segunda vez
console.log("VOLVEMOS A ACELERAR:");
scooter.acelerar(); 
scooter.mostrarInfo(); 

// QUINTA PRUEBA: Frenar la scooter
console.log("FRENAMOS LA MOTO:");
scooter.frenar(); 
scooter.mostrarInfo(); 