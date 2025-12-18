// header.js - Gestiona el header en todas las páginas
export function cargarHeader() {
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
export function actualizarContadorCarrito(cantidad) {
    const enlaceCarrito = document.getElementById('enlace-carrito');
    if (enlaceCarrito) {
        enlaceCarrito.textContent = `Carrito (${cantidad})`;
    }
}

// Ejecutar cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarHeader);