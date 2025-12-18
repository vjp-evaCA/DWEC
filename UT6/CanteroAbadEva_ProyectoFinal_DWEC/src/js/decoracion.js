// decoracion.js - Página de decoración
const { cargarHeader } = require('./header.js');
const { Producto } = require('./Producto.js');
const { Carrito } = require('./Carrito.js');
require('../css/styles.css');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando productos de decoración...');
    
    await cargarProductosDecoracion();
    
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
        
        const container = document.getElementById('productos-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        productos.forEach(producto => {
            const productoDiv = Producto.getDivFromProducto(producto);
            container.appendChild(productoDiv);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}