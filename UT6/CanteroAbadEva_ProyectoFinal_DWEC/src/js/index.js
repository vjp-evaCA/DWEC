// Al inicio del archivo
import '../css/styles.css';
// src/js/index.js
console.log("✅ Aplicación Mini-Market iniciada");

async function cargarProductsDestacados() {
    console.log("🔄 Cargando productos destacados...");
    
    const container = document.getElementById('products-container');
    
    if (!container) {
        console.error("❌ No se encuentra el contenedor de productos");
        return;
    }
    
    try {
        // Usar el proxy de webpack
        const response = await fetch('/api/electronica');
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        
        const productos = await response.json();
        console.log(`📦 ${productos.length} productos cargados`);
        
        // Limpiar y mostrar productos
        container.innerHTML = productos.map(producto => `
            <div class="producto-card">
                <div class="producto-imagen">
                    <img src="${producto.foto}" alt="${producto.titulo}" 
                         onerror="this.src='https://via.placeholder.com/400x300/3498db/ffffff?text=Producto'">
                </div>
                <div class="producto-info">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-descripcion">${producto.descripcion}</p>
                    <div class="producto-precio-boton">
                        <span class="producto-precio">${producto.precio}€</span>
                        <button class="producto-boton" data-id="${producto.id}">
                            🛒 Añadir
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Agregar eventos a los botones
        document.querySelectorAll('.producto-boton').forEach(boton => {
            boton.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const producto = productos.find(p => p.id == id);
                alert(`✅ "${producto.titulo}"\n💰 Precio: ${producto.precio}€\n\nAñadido al carrito`);
                console.log(`Producto ${id} añadido al carrito`);
            });
        });
        
        console.log("🎉 Productos mostrados correctamente");
        
    } catch (error) {
        console.error("❌ Error:", error);
        container.innerHTML = `
            <div style="background: #ffebee; padding: 30px; border-radius: 10px; text-align: center; grid-column: 1/-1;">
                <h3 style="color: #c62828;">⚠️ Error al cargar productos</h3>
                <p>${error.message}</p>
                <p>Por favor, verifica que:</p>
                <ol style="text-align: left; display: inline-block;">
                    <li>El servidor JSON está corriendo (localhost:3000)</li>
                    <li>La conexión a internet funciona</li>
                </ol>
                <button onclick="location.reload()" 
                        style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">
                    🔄 Reintentar
                </button>
            </div>
        `;
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProductsDestacados);

// También ejecutar si el DOM ya está listo
if (document.readyState !== 'loading') {
    cargarProductsDestacados();
}