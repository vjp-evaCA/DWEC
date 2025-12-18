// Carrito.js - Clase principal para gestionar el carrito
const { DatabaseCarrito } = require('./DatabaseCarrito.js');

class Carrito {
    /**
     * Añade un producto al carrito
     */
    static async añadirProductoCarrito(producto) {
        try {
            const db = await DatabaseCarrito.openDatabase();
            await DatabaseCarrito.insertProduct(db, producto);
            db.close();
            
            // Actualizar el contador del header
            await Carrito.actualizarCabeceraCarrito();
            
            console.log(`Producto añadido: ${producto.titulo}`);
            return true;
        } catch (error) {
            console.error('Error al añadir producto:', error);
            return false;
        }
    }

    /**
     * Actualiza el contador del carrito en el header
     */
    static async actualizarCabeceraCarrito() {
        try {
            const db = await DatabaseCarrito.openDatabase();
            const productos = await DatabaseCarrito.getAllProducts(db);
            db.close();
            
            // Necesitamos la función actualizarContadorCarrito
            // Se actualizará desde el header.js
            return productos.length;
        } catch (error) {
            console.error('Error al actualizar cabecera:', error);
            return 0;
        }
    }

    /**
     * Elimina un producto del carrito
     */
    static async eliminarProductoCarrito(productoId, trProducto = null) {
        try {
            const db = await DatabaseCarrito.openDatabase();
            await DatabaseCarrito.deleteProduct(db, productoId);
            db.close();
            
            // Eliminar del DOM si se proporcionó el elemento
            if (trProducto) {
                trProducto.remove();
            }
            
            // Actualizar cabecera y precio total
            await Carrito.actualizarCabeceraCarrito();
            Carrito.calcularPrecioFinal();
            
            console.log(`Producto eliminado: ID ${productoId}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return false;
        }
    }

    /**
     * Calcula el precio total de todos los productos en el carrito
     */
    static async calcularPrecioFinal() {
        try {
            const db = await DatabaseCarrito.openDatabase();
            const productos = await DatabaseCarrito.getAllProducts(db);
            db.close();
            
            let total = 0;
            productos.forEach(producto => {
                total += parseFloat(producto.precio);
            });
            
            // Actualizar el elemento en el DOM
            const precioTotalElem = document.getElementById('precio-total');
            if (precioTotalElem) {
                precioTotalElem.textContent = `${total.toFixed(2)} €`;
            }
            
            return total;
        } catch (error) {
            console.error('Error al calcular precio final:', error);
            return 0;
        }
    }

    /**
     * Carga todos los productos del carrito en la tabla
     */
    static async cargarProductosCarrito() {
        try {
            const db = await DatabaseCarrito.openDatabase();
            const productos = await DatabaseCarrito.getAllProducts(db);
            db.close();
            
            const cuerpoTabla = document.getElementById('cuerpo-tabla');
            if (!cuerpoTabla) return;
            
            // Limpiar tabla
            cuerpoTabla.innerHTML = '';
            
            // Añadir cada producto
            productos.forEach(producto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <img src="${producto.foto}" alt="${producto.titulo}" width="50">
                        ${producto.titulo}
                    </td>
                    <td>${producto.precio} €</td>
                    <td>
                        <button class="btn-eliminar" data-id="${producto.id}">
                            Eliminar
                        </button>
                    </td>
                `;
                
                // Añadir evento al botón eliminar
                const btnEliminar = tr.querySelector('.btn-eliminar');
                btnEliminar.addEventListener('click', async () => {
                    await Carrito.eliminarProductoCarrito(producto.id, tr);
                });
                
                cuerpoTabla.appendChild(tr);
            });
            
            // Calcular precio total
            await Carrito.calcularPrecioFinal();
            
        } catch (error) {
            console.error('Error al cargar productos del carrito:', error);
        }
    }

    /**
     * Vacía completamente el carrito
     */
    static async vaciarCarrito() {
        try {
            const db = await DatabaseCarrito.openDatabase();
            const transaction = db.transaction([DatabaseCarrito.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(DatabaseCarrito.STORE_NAME);
            const request = store.clear();
            
            return new Promise((resolve, reject) => {
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    db.close();
                    if (document.getElementById('cuerpo-tabla')) {
                        document.getElementById('cuerpo-tabla').innerHTML = '';
                        Carrito.calcularPrecioFinal();
                    }
                    resolve();
                };
            });
        } catch (error) {
            console.error('Error al vaciar carrito:', error);
        }
    }
}

module.exports = { Carrito };