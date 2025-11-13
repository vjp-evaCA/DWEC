var PI = 3.1416;
var Circulo = /** @class */ (function () {
    function Circulo(radio) {
        this.radio = radio;
    }
    Circulo.prototype.getArea = function () {
        return PI * this.radio * this.radio;
    };
    Circulo.prototype.pintarInfo = function () {
        console.log("El área del círculo es " + this.getArea() + " y su radio es " + this.radio);
    };
    return Circulo;
}());
var Rectangulo = /** @class */ (function () {
    function Rectangulo(lado1, lado2) {
        this.lado1 = lado1;
        this.lado2 = lado2;
    }
    Rectangulo.prototype.getArea = function () {
        return this.lado1 * this.lado2;
    };
    Rectangulo.prototype.pintarInfo = function () {
        console.log("El área del rectángulo es " + this.getArea() + " y los lados miden " + this.lado1 + " y " + this.lado2);
    };
    return Rectangulo;
}());
var Triangulo = /** @class */ (function () {
    function Triangulo(base, altura) {
        this.base = base;
        this.altura = altura;
    }
    Triangulo.prototype.getArea = function () {
        return (this.base * this.altura) / 2;
    };
    Triangulo.prototype.pintarInfo = function () {
        console.log("El área del triángulo es " + this.getArea() + " y  la base es " + this.base + ", la altura es " + this.altura);
    };
    return Triangulo;
}());
var circulo = new Circulo(5);
var rectangulo = new Rectangulo(4, 6);
var triangulo = new Triangulo(3, 8);
console.log("=== Los resultados de las figuras geométricas ===");
circulo.pintarInfo();
rectangulo.pintarInfo();
triangulo.pintarInfo();
var figuras = [new Circulo(3), new Rectangulo(4, 6), new Triangulo(3, 6)];
function pintarFiguras(figuras) {
    figuras.forEach(function (figura) {
        console.log(figura.pintarInfo());
        console.log("Su área es:" + figura.getArea());
    });
}
console.log("\n=== Figuras ===");
pintarFiguras(figuras);
