export function cargarHeader(paginaActual = '') {
    const header = document.createElement('header');
    header.id = 'header';
    
    header.innerHTML = `
        <nav>
            <ul>
                <li><a href="index.html" class="${paginaActual === 'index' ? 'active' : ''}">Inicio</a></li>
                <li><a href="electronica.html" class="${paginaActual === 'electronica' ? 'active' : ''}">Electrónica</a></li>
                <li><a href="muebles.html" class="${paginaActual === 'muebles' ? 'active' : ''}">Muebles</a></li>
                <li><a href="decoracion.html" class="${paginaActual === 'decoracion' ? 'active' : ''}">Decoración</a></li>
                <li>
                    <a href="cesta.html" class="${paginaActual === 'cesta' ? 'active' : ''}">
                        <span id="textocesta">Cesta de la compra (0)</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;
    
    document.body.prepend(header);
}

// Función auxiliar para determinar página activa
export function activarPagina(nombrePagina) {
    return nombrePagina === obtenerPaginaActual() ? 'active' : '';
}

function obtenerPaginaActual() {
    const path = window.location.pathname;
    if (path.includes('electronica.html')) return 'electronica';
    if (path.includes('muebles.html')) return 'muebles';
    if (path.includes('decoracion.html')) return 'decoracion';
    if (path.includes('cesta.html')) return 'cesta';
    return 'index';
}