// header.js - Gestiona el header en todas las páginas
const { Carrito } = require('./Carrito.js');

function cargarHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    header.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="electronica.html">Electrónica</a></li>
                <li><a href="muebles.html">Muebles</a></li>
                <li><a href="decoracion.html">Decoración</a></li>
                <li><a href="cesta.html" id="enlace-carrito">Carrito (0)</a></li>
            </ul>
        </nav>
    `;
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito(cantidad) {
    const enlaceCarrito = document.getElementById('enlace-carrito');
    if (enlaceCarrito) {
        enlaceCarrito.textContent = `Carrito (${cantidad})`;
    }
}

// Actualizar contador al cargar cada página
document.addEventListener('DOMContentLoaded', async () => {
    cargarHeader();
    try {
        await Carrito.actualizarCabeceraCarrito();
    } catch (error) {
        console.error('Error al actualizar carrito:', error);
    }
});

module.exports = { cargarHeader, actualizarContadorCarrito };