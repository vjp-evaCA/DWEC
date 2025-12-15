// Representa un producto con propiedades básicas
class Producto {
    constructor(item, cantidad, precioUnidad, marca) {
        
        // Valores por defecto y limpieza de strings
        this.item = item && item.trim() !== '' ? item.trim() : '-';
        this.cantidad = cantidad !== undefined && cantidad !== '' ? Number(cantidad) : 0;
        this.precioUnidad = precioUnidad !== undefined && precioUnidad !== '' ? Number(precioUnidad) : 0;
        this.marca = marca && marca.trim() !== '' ? marca.trim() : '-';
    }
    
    // Crea una fila con celdas para mostrar el producto en la tabla
    static crearFila(producto) {
        const fila = document.createElement('tr');
        const celdaItem = document.createElement('td');
        const celdaCantidad = document.createElement('td');
        const celdaPrecio = document.createElement('td');
        const celdaMarca = document.createElement('td');
        
        celdaItem.textContent = producto.item;
        celdaCantidad.textContent = producto.cantidad;
        celdaPrecio.textContent = producto.precioUnidad.toFixed(2) + '€';
        celdaMarca.textContent = producto.marca;
        
        fila.appendChild(celdaItem);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaMarca);
        
        return fila;
    }
}

export default Producto;