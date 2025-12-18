// Producto.js - Clase para manejar la representación de productos
class Producto {
    /**
     * Recibe un producto del servidor y devuelve una representación en HTML como div
     */
    static getDivFromProducto(producto) {
        const div = document.createElement('div');
        div.className = 'producto-card';
        div.dataset.id = producto.id;
        div.dataset.titulo = producto.titulo;
        div.dataset.precio = producto.precio;
        div.dataset.foto = producto.foto;
        div.dataset.descripcion = producto.descripcion;
        
        div.innerHTML = `
            <div class="producto-imagen">
                <img src="${producto.foto}" alt="${producto.titulo}" loading="lazy">
            </div>
            <div class="producto-info">
                <h3>${producto.titulo}</h3>
                <p class="producto-descripcion">${producto.descripcion.substring(0, 80)}...</p>
                <div class="producto-precio">
                    <span class="precio">${producto.precio} €</span>
                    <button class="btn-añadir" data-id="${producto.id}">
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
        tr.dataset.key = productoBD.key;
        
        tr.innerHTML = `
            <td>
                <img src="${productoBD.foto}" alt="${productoBD.titulo}" width="50" height="50">
                ${productoBD.titulo}
            </td>
            <td class="precio-td">${productoBD.precio} €</td>
            <td>
                <button class="btn-eliminar" data-id="${productoBD.id}" data-key="${productoBD.key}">
                    Eliminar
                </button>
            </td>
        `;
        
        return tr;
    }
}

module.exports = { Producto };