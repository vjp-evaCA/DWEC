

// Producto.js - Clase para manejar la representación de productos
export class Producto {
    static getDivFromProducto(producto) {
        const div = document.createElement('div');
        div.className = 'producto-card';
        div.dataset.id = producto.id;
        div.dataset.titulo = producto.titulo;
        div.dataset.precio = producto.precio;
        div.dataset.foto = producto.foto;
        div.dataset.descripcion = producto.description || producto.descripcion; // ← Ambos

        // USA RUTA RELATIVA:
        const imagenPath = `images/${producto.foto}`;  // ← SIN / al inicio
        
        div.innerHTML = `
            <div class="producto-imagen">
                <img src="${imagenPath}" alt="${producto.titulo}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<div style=\\'width:300px;height:200px;background:#eee;display:flex;align-items:center;justify-content:center;\\'>Imagen no disponible</div>';">
            </div>
            <div class="producto-info">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-descripcion">${producto.descripcion.substring(0, 80)}...</p>
                <div class="producto-precio-boton">
                    <span class="producto-precio">${producto.precio} €</span>
                    <button class="producto-boton btn-añadir" data-id="${producto.id}">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;
        
        return div;
    }

    /**
     * Recibe un producto de la BD local y lo devuelve como un tr para la tabla
     */
    static getTrFromProductoBD(productoBD) {
        const tr = document.createElement('tr');
        tr.dataset.id = productoBD.id;
        
        tr.innerHTML = `
            <td>
                <img src="${productoBD.foto}" alt="${productoBD.titulo}" width="50">
                ${productoBD.titulo}
            </td>
            <td>${productoBD.precio} €</td>
            <td>
                <button class="btn-eliminar" data-id="${productoBD.id}">
                    Eliminar
                </button>
            </td>
        `;
        
        // AÑADIR EVENTO ELIMINAR
        const btn = tr.querySelector('.btn-eliminar');
        btn.addEventListener('click', async () => {
            // Esto se manejará desde cesta.js
            const event = new CustomEvent('eliminarProducto', {
                detail: { producto: productoBD, tr: tr }
            });
            document.dispatchEvent(event);
        });
        
        return tr;
    }
}