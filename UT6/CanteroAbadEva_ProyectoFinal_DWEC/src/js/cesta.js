// cesta.js - Página del carrito
const { cargarHeader } = require('./header.js');
const { Carrito } = require('./Carrito.js');
const { Producto } = require('./Producto.js');
require('../css/styles.css');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Cargando página del carrito...');
    
    // Cargar productos del carrito
    await Carrito.cargarProductosCarrito();
    
    // Botón para vaciar carrito
    const btnVaciar = document.createElement('button');
    btnVaciar.id = 'btn-vaciar';
    btnVaciar.textContent = 'Vaciar Carrito';
    btnVaciar.style.marginTop = '20px';
    btnVaciar.style.padding = '10px 20px';
    btnVaciar.style.backgroundColor = '#dc3545';
    btnVaciar.style.color = 'white';
    btnVaciar.style.border = 'none';
    btnVaciar.style.borderRadius = '4px';
    btnVaciar.style.cursor = 'pointer';
    
    btnVaciar.addEventListener('click', async () => {
        if (confirm('¿Estás seguro de vaciar el carrito?')) {
            await Carrito.vaciarCarrito();
            alert('Carrito vaciado');
        }
    });
    
    const main = document.querySelector('main');
    if (main) {
        main.appendChild(btnVaciar);
    }
});