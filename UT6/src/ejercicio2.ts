class PuntoD {
    punto1:any;
    punto2: any;

    constructor(punto1: number, punto2: number) {
        this.punto1 = {
            x:2,
            y:3
        },
        this.punto2 = {
            x:5,
            y:8
        };
    }

    getPunto1(): any {
        return this.punto1;
    }
    getPunto2(): any {
        return this.punto2;
    }   
    setPunto1(punto1: any): void {
        this.punto1 = punto1;
    }
    setPunto2(punto2: any): void {
        this.punto2 = punto2;
    }
    
    calcularHipotenusa(): number {
        return Math.sqrt(Math.pow((this.punto2.x - this.punto1.x), 2) + Math.pow((this.punto2.y - this.punto1.y), 2));
    }
}

let punto = new PuntoD(2,3);

console.log("La hipotenusa es: " + punto.calcularHipotenusa());