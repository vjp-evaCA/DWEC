// src/js/index.js
import { cargarHeader } from './header.js';
import { Producto } from './Producto.js';
import { Carrito } from './Carrito.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Página principal cargada');
    
    // 1. Cargar header
    cargarHeader('index');
    
    // 2. Cargar productos
    await cargarProductosDestacados();
});

async function cargarProductosDestacados() {
    try {
        console.log('Cargando productos...');
        
        // VERIFICA que Producto existe
        console.log('Producto class:', Producto);
        console.log('getDivFromProducto exists:', Producto.getDivFromProducto);
        
        const response = await fetch('http://localhost:3000/electronica');
        const productos = await response.json();
        
        console.log('Productos recibidos:', productos.length);
        
        const container = document.getElementById('products-container');
        if (!container) {
            console.error('❌ No se encuentra #products-container');
            return;
        }
        
        container.innerHTML = '';
        
        productos.forEach(producto => {
            // VERIFICA antes de llamar
            if (Producto && Producto.getDivFromProducto) {
                const div = Producto.getDivFromProducto(producto);
                
                // Añadir evento al botón
                const btn = div.querySelector('.btn-añadir, .btn-comprar, button');
                if (btn) {
                    btn.addEventListener('click', async () => {
                        await Carrito.añadirProductoCarrito(producto);
                        alert(`${producto.titulo} añadido al carrito!`);
                    });
                }
                
                container.appendChild(div);
            } else {
                console.error('❌ Producto.getDivFromProducto no existe');
            }
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}