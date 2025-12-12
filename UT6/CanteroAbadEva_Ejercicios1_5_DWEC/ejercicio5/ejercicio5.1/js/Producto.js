/**
 * Clase Producto para representar un artículo en el almacén
 * Ejercicio 5 - IndexedDB: Parte 1
 */

class Producto {
    /**
     * Constructor de la clase Producto
     * @param {string} item - Nombre del artículo
     * @param {number} cantidad - Cantidad en stock
     * @param {number} precioUnidad - Precio por unidad
     * @param {string} marca - Marca del producto
     */
    constructor(item, cantidad, precioUnidad, marca) {
        // Si algún campo no tiene valor, se asigna "-" (según especificaciones)
        this.item = item || "-";
        this.cantidad = cantidad || 0;
        this.precioUnidad = precioUnidad || 0;
        this.marca = marca || "-";
        this.id = null; // ID de IndexedDB
    }

    /**
     * Devuelve un elemento <tr> con la información del producto
     * @returns {HTMLTableRowElement} - Fila de tabla con los datos del producto
     */
    devolverTRProducto() {
        // Crear la fila de tabla
        const tr = document.createElement('tr');
        
        // Calcular el valor total de este producto
        const valorTotal = this.cantidad * this.precioUnidad;
        
        // Crear las celdas con los datos del producto
        tr.innerHTML = `
            <td>${this.item}</td>
            <td>${this.cantidad}</td>
            <td>${this.precioUnidad.toFixed(2)} €</td>
            <td>${this.marca}</td>
            <td>${valorTotal.toFixed(2)} €</td>
            <td>
                <button class="btn btn-action delete" data-id="${this.id}">Eliminar</button>
            </td>
        `;
        
        return tr;
    }

    /**
     * Devuelve el valor total del producto (cantidad * precio)
     * @returns {number} - Valor total del producto
     */
    getValorTotal() {
        return this.cantidad * this.precioUnidad;
    }

    /**
     * Método estático para validar los datos de un producto
     * @param {Object} datos - Datos del producto a validar
     * @returns {boolean} - True si los datos son válidos
     */
    static validarDatos(datos) {
        // Verificar que todos los campos requeridos estén presentes
        if (!datos.item || datos.item.trim() === '') {
            alert('El nombre del artículo es obligatorio');
            return false;
        }
        
        if (isNaN(datos.cantidad) || datos.cantidad < 0) {
            alert('La cantidad debe ser un número mayor o igual a 0');
            return false;
        }
        
        if (isNaN(datos.precioUnidad) || datos.precioUnidad < 0) {
            alert('El precio por unidad debe ser un número mayor o igual a 0');
            return false;
        }
        
        if (!datos.marca || datos.marca.trim() === '') {
            alert('La marca del producto es obligatoria');
            return false;
        }
        
        return true;
    }
}