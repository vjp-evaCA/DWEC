// electronica.js - Página de electrónica
import { cargarHeader } from './header.js';  // ← Asegúrate que sea import
import { Producto } from './Producto.js';
import { Carrito } from './Carrito.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando productos de electrónica...');
    cargarHeader('electronica');
    await cargarProductosElectronica();
});

async function cargarProductosElectronica() {
    try {
        const response = await fetch('http://localhost:3000/electronica');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const productos = await response.json();
        console.log('Productos recibidos:', productos);
        
        const container = document.getElementById('products-container');
        if (!container) {
            console.error('No se encuentra #products-container');
            return;
        }
        
        container.innerHTML = '';
        
        productos.forEach(producto => {
            const div = Producto.getDivFromProducto(producto);
            
            // Añadir evento al botón
            const btn = div.querySelector('.btn-añadir');
            if (btn) {
                btn.addEventListener('click', async () => {
                    const añadido = await Carrito.añadirProductoCarrito(producto);
                    if (añadido) {
                        alert(`${producto.titulo} añadido al carrito!`);
                    }
                });
            }
            
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar productos de electrónica:', error);
        const container = document.getElementById('products-container');
        if (container) {
            container.innerHTML = '<p class="error">Error al cargar productos. Verifica que el servidor JSON esté corriendo en puerto 3000.</p>';
        }
    }
}