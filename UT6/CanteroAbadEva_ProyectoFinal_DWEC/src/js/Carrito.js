import { DatabaseCarrito } from './DatabaseCarrito.js';
import { Producto } from './Producto.js';

export class Carrito {

    /**
     * Abre la BD local, introduce el producto que viene del servidor directamente a la BD
     * Si se inserta correctamente hace una llamada a "actualizarCabeceraCarrito".
     * Finalmente cierra la BD.
     * @param producto : El producto del servidor a insertar en IndexedDB
     */
    static async añadirProductoCarrito(producto) {
        try {
            const db = await DatabaseCarrito.openDatabase();
            await DatabaseCarrito.insertProduct(db, producto);
            db.close();
            
            await Carrito.actualizarCabeceraCarrito();
            return true;
        } catch (error) {
            console.error('Error al añadir producto:', error);
            return false;
        }
    }

    /**
     * Abre la BD local, Extrae todos los productos. Saca la longitud de ese array de productos.
     * Actualiza con el número de productos el texto del header del carrito.
     * Cierra la BD.
     */
    static async actualizarCabeceraCarrito() {
        try {
            const db = await DatabaseCarrito.openDatabase();
            const productos = await DatabaseCarrito.getAllProducts(db);
            db.close();
            
            const contadorCarrito = document.getElementById('textocesta');
            if (contadorCarrito) {
                contadorCarrito.textContent = `Cesta de la compra (${productos.length})`;
            }
            
            return productos.length;
        } catch (error) {
            console.error('Error al actualizar cabecera:', error);
            return 0;
        }
    }

    /**
     * Abre la BD local, elimina el producto referido por productoDB.
     * ActualizarCabeceraCarrito. CalculaPrecioFinal. Cierra la BD.
     * @param productoDB El producto de la base de datos que quieres eliminar.
     * @param trProducto El div que representa al producto en la tabla del carrito (para eliminarlo)
     */
    static async eliminarProductoCarrito(productoDB, trProducto = null) {
        try {
            const db = await DatabaseCarrito.openDatabase();
            await DatabaseCarrito.deleteProduct(db, productoDB.id);
            db.close();
            
            if (trProducto) {
                trProducto.remove();
            }
            
            await Carrito.actualizarCabeceraCarrito();
            Carrito.calcularPrecioFinal();
            
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return false;
        }
    }

    /**
     * Elimina el tr de precio total.
     * Recorre todos los tr de la tabla de productos, suma los precios.
     * Añade la última fila de precio total con la suma calculada anteriormente.
     */
    static calcularPrecioFinal() {
        const cuerpoTabla = document.getElementById('cuerpo-tabla');
        if (!cuerpoTabla) return;

        // Eliminar fila de precio total si existe
        const filaTotalAnterior = document.getElementById('fila-total');
        if (filaTotalAnterior) {
            filaTotalAnterior.remove();
        }

        // Sumar precios de todas las filas de productos
        let total = 0;
        const filasProductos = cuerpoTabla.querySelectorAll('tr');
        filasProductos.forEach(fila => {
            const precioCelda = fila.querySelector('td:nth-child(2)');
            if (precioCelda) {
                const precioTexto = precioCelda.textContent.replace(' €', '').trim();
                total += parseFloat(precioTexto) || 0;
            }
        });

        // Crear nueva fila de total
        const filaTotal = document.createElement('tr');
        filaTotal.id = 'fila-total';
        filaTotal.innerHTML = `
            <td colspan="2"><strong>Total</strong></td>
            <td><strong id="precio-total">${total.toFixed(2)} €</strong></td>
        `;
        cuerpoTabla.appendChild(filaTotal);
    }

    /**
     * Carga los productos del carrito en la tabla (para cesta.js)
     */
    static async cargarProductosCarrito() {
        try {
            const db = await DatabaseCarrito.openDatabase();
            const productosBD = await DatabaseCarrito.getAllProducts(db);
            db.close();

            const cuerpoTabla = document.getElementById('cuerpo-tabla');
            if (!cuerpoTabla) return;

            cuerpoTabla.innerHTML = '';

            productosBD.forEach(productoBD => {
                const tr = Producto.getTrFromProductoBD(productoBD);
                cuerpoTabla.appendChild(tr);
            });

            Carrito.calcularPrecioFinal();
        } catch (error) {
            console.error('Error al cargar productos del carrito:', error);
        }
    }
}