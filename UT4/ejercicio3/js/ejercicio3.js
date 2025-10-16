class CicloMotor {
    // Atributos en constructor
    constructor(marca, aceleracion, desaceleracion) {
        this.numRuedas = 2;
        this.velocidadMaxima = 120;
        this.velocidadActual = 0;
        this.marca = marca;
        this.aceleracion = aceleracion;
        this.desaceleracion = desaceleracion;
        this.encendida = false;
    }

    // Métodos
    arrancar() {
        this.encendida = true;
        console.log("Se mete y gira la llave, la moto arranca.");
    }

    acelerar() {
        if (this.encendida) {
            this.velocidadActual = this.velocidadActual + this.aceleracion;
            if (this.velocidadActual > this.velocidadMaxima) {
                this.velocidadActual = this.velocidadMaxima;
            }
            console.log("Acelerando... Velocidad actual: " + this.velocidadActual + " km/h");
        } else {
            console.log("No se puede acelerar, la moto está apagada.");
        }
    }

    frenar() {
        if (this.encendida) {
            this.velocidadActual = this.velocidadActual - this.desaceleracion;
            if (this.velocidadActual < 0) {
                this.velocidadActual = 0;
            }
            console.log("Frenando... Velocidad actual: " + this.velocidadActual + " km/h");
        }
    }

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
ciclomotor.acelerar(); // No se puede acelerar una moto apagada
console.log(ciclomotor.mostrarInfo());

console.log("\nLA MOTO TRAS ARRANCARLA Y ACELERAR:");
ciclomotor.arrancar();
ciclomotor.acelerar();
console.log(ciclomotor.mostrarInfo());

console.log("\nVOLVEMOS A ACELERAR:");
ciclomotor.acelerar(); // No podrá pasar de 120km/h
console.log(ciclomotor.mostrarInfo());

console.log("\nFRENAMOS LA MOTO:");
ciclomotor.frenar();
console.log(ciclomotor.mostrarInfo());

class MotoCross extends CicloMotor {
    // Atributos en constructor
    constructor(marca, aceleracion, desaceleracion) {
        super(marca, aceleracion, desaceleracion);
        this.velocidadMaxima = 90; // Velocidad máxima específica para Motocross
        this.marchaActual = 0; // Atributo adicional para Motocross
    }

    arrancar() {
        console.log("Se levanta la pata de cabra");
        super.arrancar(); // Llama al método arrancar del padre
    }

    acelerar() {
        super.acelerar(); // Llama al método acelerar del padre
        this.ajustarMarcha(); // Ajusta la marcha después de acelerar
    }

    frenar() {
        super.frenar(); // Llama al método frenar del padre
        this.ajustarMarcha(); // Ajusta la marcha después de frenar
    }

    ajustarMarcha() {
        // Ajusta la marcha según la velocidad actual según la tabla proporcionada
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


class Scooter extends CicloMotor {
    constructor(marca) {
        // Scooter siempre tiene aceleración=25 y desaceleración=15
        super(marca, 25, 15);
        // No cambiamos velocidadMaxima, mantiene 120 km/h del padre
        // No necesita atributos adicionales
    }

    arrancar() {
        // Sobrescribe completamente el método con el comportamiento específico de Scooter
        this.encendida = true;
        console.log("Se acerca la llave y se pulsa el botón, la moto arranca.");
    }

    // NO necesitamos sobrescribir acelerar() ni frenar()
    // porque ya heredan el comportamiento del padre y usan
    // los valores fijos de 25 y 15 que pasamos en el constructor

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
console.log(scooter.mostrarInfo()); // ← FALTABA console.log()

console.log("\nLA MOTO TRAS ACELERAR:");
scooter.acelerar();
console.log(scooter.mostrarInfo()); // ← FALTABA console.log()

console.log("\nLA MOTO TRAS ARRANCAR Y ACELERAR:");
scooter.arrancar();
scooter.acelerar();
console.log(scooter.mostrarInfo()); // ← FALTABA console.log()

console.log("\nVOLVEMOS A ACELERAR:");
scooter.acelerar();
console.log(scooter.mostrarInfo()); // ← FALTABA console.log()

console.log("\nFRENAMOS LA MOTO:");
scooter.frenar();
console.log(scooter.mostrarInfo()); // ← FALTABA console.log()
