// Clase padre
class CicloMotor {
    // Constructor que inicializa los atributos
    constructor(marca, aceleracion, desaceleracion) {
        this.numRuedas = 2;                    // Todos los ciclomotores tienen 2 ruedas
        this.velocidadMaxima = 120;            // Velocidad máxima por defecto
        this.velocidadActual = 0;              // Velocidad inicial en 0
        this.marca = marca;                    // Marca del ciclomotor
        this.aceleracion = aceleracion;        // Cuánto acelera por cada impulso
        this.desaceleracion = desaceleracion;  // Cuánto frena por cada impulso
        this.encendida = false;                // Estado del motor (apagada inicialmente)
    }

    // Método para arrancar el ciclomotor
    arrancar() {
        this.encendida = true;
        console.log("Se mete y gira la llave, la moto arranca.");
    }

    // Método para aumentar la velocidad actual
    acelerar() {
        if (this.encendida) {
            this.velocidadActual = this.velocidadActual + this.aceleracion;

            // Control para no superar la velocidad máxima
            if (this.velocidadActual > this.velocidadMaxima) {
                this.velocidadActual = this.velocidadMaxima;
            }
            console.log("Acelerando... Velocidad actual: " + this.velocidadActual + " km/h");
        } else {
            console.log("No se puede acelerar, la moto está apagada.");
        }
    }

    // Método para reducir la velocidad actual
    frenar() {
        if (this.encendida) {
            this.velocidadActual = this.velocidadActual - this.desaceleracion;

            // Control para que la velocidad no sea negativa
            if (this.velocidadActual < 0) {
                this.velocidadActual = 0;
            }
            console.log("Frenando... Velocidad actual: " + this.velocidadActual + " km/h");
        }
    }

    // Método que devuelve toda la información del ciclomotor
    mostrarInfo() {
        return "Marca: " + this.marca +
            "\nVelocidad máxima: " + this.velocidadMaxima + " km/h" +
            "\nVelocidad actual: " + this.velocidadActual + " km/h" +
            "\nNúmero de ruedas: " + this.numRuedas +
            "\nAceleración: " + this.aceleracion + " km/h" +
            "\nDesaceleración: " + this.desaceleracion + " km/h" +
            "\nEncendida: " + (this.encendida ? "Sí" : "No");
    }
}

// PRUEBAS DE CICLOMOTOR
console.log("=== PRUEBA DEL CICLOMOTOR ===");

let ciclomotor = new CicloMotor("Kawasaki", 70, 20);

console.log("LA MOTO INICIALMENTE");
console.log(ciclomotor.mostrarInfo());

console.log("\nLA MOTO TRAS ACELERAR:");
ciclomotor.acelerar();
console.log(ciclomotor.mostrarInfo());

console.log("\nLA MOTO TRAS ARRANCARLA Y ACELERAR:");
ciclomotor.arrancar();
ciclomotor.acelerar();
console.log(ciclomotor.mostrarInfo());

console.log("\nVOLVEMOS A ACELERAR:");
ciclomotor.acelerar(); 
console.log(ciclomotor.mostrarInfo());

console.log("\nFRENAMOS LA MOTO:");
ciclomotor.frenar();
console.log(ciclomotor.mostrarInfo());

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
        return "MotoCross - " + 
               "Marca: " + this.marca +
               "\nVelocidad máxima: " + this.velocidadMaxima + " km/h" +
               "\nVelocidad actual: " + this.velocidadActual + " km/h" +
               "\nMarcha actual: " + this.marchaActual +
               "\nNúmero de ruedas: " + this.numRuedas +
               "\nAceleración: " + this.aceleracion + " km/h" +
               "\nDesaceleración: " + this.desaceleracion + " km/h" +
               "\nEncendida: " + (this.encendida ? "Sí" : "No");
    }
}

// PRUEBAS DE MOTOCROSS
console.log("\n\n=== PRUEBA DE MOTOCROSS ===");

let motoCross = new MotoCross("Yamaha", 25, 15);

console.log("MOTO DE MOTOCROSS INICIALMENTE");
console.log(motoCross.mostrarInfo());

console.log("\nINTENTAMOS ACELERAR SIN ARRANCAR:");
motoCross.acelerar();

console.log("\nARRANCAMOS LA MOTO:");
motoCross.arrancar();

console.log("\nACELERAMOS POR PRIMERA VEZ:");
motoCross.acelerar();
console.log(motoCross.mostrarInfo());

console.log("\nACELERAMOS POR SEGUNDA VEZ:");
motoCross.acelerar();
console.log(motoCross.mostrarInfo());

console.log("\nACELERAMOS POR TERCERA VEZ:");
motoCross.acelerar();
console.log(motoCross.mostrarInfo());

console.log("\nFRENAMOS LA MOTO:");
motoCross.frenar();
console.log(motoCross.mostrarInfo());

console.log("\nFRENAMOS HASTA DETENERNOS:");
motoCross.frenar();
motoCross.frenar();
console.log(motoCross.mostrarInfo());

// Clase hija
class Scooter extends CicloMotor {
    constructor(marca) {
        // Scooter siempre tiene aceleración=25 y desaceleración=15
        super(marca, 25, 15);
    }

    // Método arracar de Scooter
    arrancar() {
        this.encendida = true;
        console.log("Se acerca la llave y se pulsa el botón, la moto arranca.");
    }

    // Los métodos acelerar() y frenar() ya vienen listos del padre:
    // No hace falta cambiarlos, funcionan bien con los valores fijos del constructor.

    // Sobrescribe mostrarInfo
    mostrarInfo() {
        return "Scooter - " + 
               "Marca: " + this.marca +
               "\nVelocidad máxima: " + this.velocidadMaxima + " km/h" +
               "\nVelocidad actual: " + this.velocidadActual + " km/h" +
               "\nNúmero de ruedas: " + this.numRuedas +
               "\nAceleración: " + this.aceleracion + " km/h (fija)" +
               "\nDesaceleración: " + this.desaceleracion + " km/h (fija)" +
               "\nEncendida: " + (this.encendida ? "Sí" : "No");
    }
}

// PRUEBAS DE SCOOTER
console.log("\n\n=== PRUEBA DE LA SCOOTER ===");

let scooter = new Scooter("Yamaha");

console.log("MOTO SCOOTER INICIALMENTE");
console.log(scooter.mostrarInfo());

console.log("\nLA MOTO TRAS ACELERAR:");
scooter.acelerar();
console.log(scooter.mostrarInfo());

console.log("\nLA MOTO TRAS ARRANCAR Y ACELERAR:");
scooter.arrancar();
scooter.acelerar();
console.log(scooter.mostrarInfo());

console.log("\nVOLVEMOS A ACELERAR:");
scooter.acelerar();
console.log(scooter.mostrarInfo());

console.log("\nFRENAMOS LA MOTO:");
scooter.frenar();
console.log(scooter.mostrarInfo());