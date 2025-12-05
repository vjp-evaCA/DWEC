'use strict';

// Creamos la clase Producto con su constructor y método para devolver una fila de tabla
class Producto {

    // Constructor de la clase
    constructor(item, cantidad, precioUnidad, marca) {
        this.item = item || '-';
        this.cantidad = cantidad || '-';
        this.precioUnidad = precioUnidad || '-';
        this.marca = marca || '-';
    }

    // Método para devolver una fila de la tabla
    devolverTRProducto() {
        return `<tr>
                    <td>${this.item}</td>
                    <td>${this.cantidad}</td>
                    <td>${this.precioUnidad}</td>
                    <td>${this.marca}</td>
                </tr>`;
    }
}