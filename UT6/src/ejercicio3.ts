const PI = 3.1416;

interface BiDimensional {
    getArea():number;
    pintarInfo();
}

class Circulo implements BiDimensional {
    constructor(public radio:number){}
    getArea(): number {
        return PI * this.radio * this.radio;
    }
    pintarInfo() {
        console.log("El área del círculo es " + this.getArea() + " y su radio es " + this.radio);
    }
}

class Rectangulo implements BiDimensional {
    constructor(public lado1:number, public lado2:number){}
    getArea(): number {
        return this.lado1 * this.lado2;
    }
    pintarInfo() {
        console.log("El área del rectángulo es " + this.getArea() + " y los lados miden " + this.lado1 + " y " + this.lado2);
    }
}

class Triangulo implements BiDimensional {
    constructor(public base:number, public altura:number){}
    getArea(): number {
        return (this.base * this.altura)/2;
    }
    pintarInfo() {
        console.log("El área del triángulo es " + this.getArea() + " y  la base es " + this.base + ", la altura es " + this.altura);
    }
}

const circulo = new Circulo(5);
const rectangulo = new Rectangulo(4, 6);
const triangulo = new Triangulo(3, 8);

console.log("=== Los resultados de las figuras geométricas ===");
circulo.pintarInfo();
rectangulo.pintarInfo();
triangulo.pintarInfo();

let figuras = [new Circulo(3), new Rectangulo(4,6), new Triangulo(3,6)];

function pintarFiguras(figuras:BiDimensional[]): void {
    figuras.forEach(figura => {
        console.log(figura.pintarInfo());
        console.log("Su área es:" + figura.getArea());
    });
}

console.log("\n=== Figuras ===");
pintarFiguras(figuras);