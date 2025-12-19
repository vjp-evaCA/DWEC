// decoracion.js - Página de decoración
import { cargarHeader } from './header.js';  // ← CAMBIA require por import
import { Producto } from './Producto.js';
import { Carrito } from './Carrito.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando productos de decoración...');
    
    // ¡IMPORTANTE! Llama a cargarHeader
    cargarHeader('decoracion');
    
    await cargarProductosDecoracion();
    
    // Añadir eventos a los botones "Añadir al carrito"
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-añadir')) {
            const productoDiv = event.target.closest('.producto-card');
            if (productoDiv) {
                const producto = {
                    id: parseInt(productoDiv.dataset.id),
                    titulo: productoDiv.dataset.titulo,
                    precio: productoDiv.dataset.precio,
                    foto: productoDiv.dataset.foto,
                    descripcion: productoDiv.dataset.descripcion
                };
                
                await Carrito.añadirProductoCarrito(producto);
                alert(`${producto.titulo} añadido al carrito!`);
            }
        }
    });
});

async function cargarProductosDecoracion() {
    try {
        const response = await fetch('http://localhost:3000/decoracion');
        const productos = await response.json();
        
        const container = document.getElementById('products-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        productos.forEach(producto => {
            const productoDiv = Producto.getDivFromProducto(producto);
            container.appendChild(productoDiv);
        });
        
        console.log(`${productos.length} productos cargados`);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        const container = document.getElementById('products-container');
        if (container) {
            container.innerHTML = '<p>Error al cargar los productos. Intenta más tarde.</p>';
        }
    }
}