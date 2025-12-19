// cesta.js - Página del carrito
import { cargarHeader } from './header.js';  // ← CAMBIA require por import
import { Carrito } from './Carrito.js';
import { Producto } from './Producto.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando página del carrito...');
    
    // Cargar header
    cargarHeader('cesta');
    
    // Cargar productos del carrito
    await Carrito.cargarProductosCarrito();
});