/**
 * Aplicación principal para gestionar productos del almacén
 * Ejercicio 5 - IndexedDB: Parte 2 (con IndexedDB)
 */

// Array para almacenar los productos localmente (sincronizado con IndexedDB)
let productos = [];

// Objeto para mapear IDs de IndexedDB a productos
let productosMap = new Map();

// Referencias a elementos DOM
const productForm = document.getElementById('productForm');
const productsTableBody = document.getElementById('productsTableBody');
const totalProductsElement = document.getElementById('totalProducts');
const totalItemsElement = document.getElementById('totalItems');
const totalInventoryValueElement = document.getElementById('totalInventoryValue');
const clearFormButton = document.getElementById('clearForm');
const clearAllButton = document.getElementById('clearAll');

// Agregar nuevo botón para estadísticas avanzadas
const statsButton = document.getElementById('statsButton') || (() => {
    const btn = document.createElement('button');
    btn.id = 'statsButton';
    btn.className = 'btn btn-info';
    btn.innerHTML = '📊 Ver Estadísticas Avanzadas';
    document.querySelector('.info-box').appendChild(btn);
    return btn;
})();

/**
 * Inicializa la aplicación con IndexedDB
 */
async function inicializarApp() {
    try {
        // Mostrar indicador de carga
        mostrarCargando(true);
        
        // Abrir la base de datos
        await ManejadorDB.abrirDB();
        
        // Cargar productos desde IndexedDB
        await cargarProductosDesdeDB();
        
        // Si no hay productos, cargar algunos de ejemplo
        if (productos.length === 0) {
            await cargarProductosEjemplo();
        }
        
        // Mostrar productos en la tabla
        actualizarTablaProductos();
        
        // Configurar event listeners
        configurarEventListeners();
        
        // Actualizar estadísticas
        actualizarEstadisticas();
        
        // Mostrar mensaje de éxito
        mostrarMensajeExito('Base de datos IndexedDB cargada correctamente');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        mostrarMensajeError('Error al cargar la base de datos: ' + error.message);
        
        // Intentar cargar desde localStorage como fallback
        cargarDesdeLocalStorage();
    } finally {
        mostrarCargando(false);
    }
}

/**
 * Carga productos desde IndexedDB
 */
async function cargarProductosDesdeDB() {
    try {
        const productosDB = await ManejadorDB.obtenerTodosProductos();
        
        // Convertir productos de IndexedDB a instancias de Producto
        productos = productosDB.map(prodDB => {
            const producto = new Producto(
                prodDB.item,
                prodDB.cantidad,
                prodDB.precioUnidad,
                prodDB.marca
            );
            
            // Guardar el ID de IndexedDB
            producto.id = prodDB.id;
            
            // Mapear el ID al producto
            productosMap.set(prodDB.id, producto);
            
            return producto;
        });
        
        console.log(`${productos.length} productos cargados desde IndexedDB`);
        
    } catch (error) {
        console.error('Error al cargar productos desde IndexedDB:', error);
        throw error;
    }
}

/**
 * Carga productos de ejemplo en la base de datos
 */
async function cargarProductosEjemplo() {
    const productosEjemplo = [
        { item: "Laptop Gamer", cantidad: 5, precioUnidad: 1299.99, marca: "ASUS" },
        { item: "Smartphone", cantidad: 12, precioUnidad: 599.99, marca: "Samsung" },
        { item: "Auriculares Bluetooth", cantidad: 25, precioUnidad: 89.99, marca: "Sony" },
        { item: "Monitor 27\"", cantidad: 8, precioUnidad: 329.50, marca: "LG" },
        { item: "Teclado Mecánico", cantidad: 15, precioUnidad: 79.99, marca: "Logitech" }
    ];
    
    try {
        for (const prod of productosEjemplo) {
            await ManejadorDB.insertar(prod);
        }
        
        // Recargar productos
        await cargarProductosDesdeDB();
        
        mostrarMensajeExito('Productos de ejemplo cargados correctamente');
        
    } catch (error) {
        console.error('Error al cargar productos de ejemplo:', error);
        mostrarMensajeError('No se pudieron cargar los productos de ejemplo');
    }
}

/**
 * Configura los event listeners de la aplicación
 */
function configurarEventListeners() {
    // Evento para enviar el formulario
    productForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        await agregarProducto();
    });
    
    // Evento para limpiar el formulario
    clearFormButton.addEventListener('click', function() {
        limpiarFormulario();
    });
    
    // Evento para eliminar todos los productos
    clearAllButton.addEventListener('click', async function() {
        await eliminarTodosLosProductos();
    });
    
    // Evento para estadísticas avanzadas
    statsButton.addEventListener('click', async function() {
        await mostrarEstadisticasAvanzadas();
    });
    
    // Evento delegado para los botones de eliminar en la tabla
    productsTableBody.addEventListener('click', async function(e) {
        if (e.target.classList.contains('delete')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            await eliminarProducto(id);
        }
    });
    
    // Evento para buscar productos
    const searchInput = document.getElementById('searchInput') || (() => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'searchInput';
        input.placeholder = '🔍 Buscar productos por nombre o marca...';
        input.className = 'search-input';
        document.querySelector('.product-list').insertBefore(input, document.querySelector('.table-container'));
        return input;
    })();
    
    searchInput.addEventListener('input', function(e) {
        buscarProductos(e.target.value);
    });
}

/**
 * Agrega un nuevo producto a IndexedDB
 */
async function agregarProducto() {
    // Obtener valores del formulario
    const item = document.getElementById('item').value.trim();
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precioUnidad = parseFloat(document.getElementById('precioUnidad').value);
    const marca = document.getElementById('marca').value.trim();
    
    // Validar datos
    const datosProducto = { item, cantidad, precioUnidad, marca };
    if (!Producto.validarDatos(datosProducto)) {
        return;
    }
    
    try {
        // Mostrar indicador de carga
        mostrarCargando(true);
        
        // Insertar en IndexedDB
        const id = await ManejadorDB.insertar(datosProducto);
        
        // Crear nuevo producto localmente
        const nuevoProducto = new Producto(item, cantidad, precioUnidad, marca);
        nuevoProducto.id = id;
        
        // Agregar al array local
        productos.push(nuevoProducto);
        productosMap.set(id, nuevoProducto);
        
        // Actualizar la interfaz
        actualizarTablaProductos();
        actualizarEstadisticas();
        limpiarFormulario();
        
        // Mostrar mensaje de confirmación
        mostrarMensajeExito(`Producto "${item}" agregado correctamente (ID: ${id})`);
        
    } catch (error) {
        console.error('Error al agregar producto:', error);
        mostrarMensajeError('Error al guardar el producto en la base de datos');
    } finally {
        mostrarCargando(false);
    }
}

/**
 * Elimina un producto por su ID
 * @param {number} id - ID del producto a eliminar
 */
async function eliminarProducto(id) {
    // Obtener el producto para el mensaje de confirmación
    const producto = productosMap.get(id);
    if (!producto) return;
    
    // Confirmar eliminación
    if (!confirm(`¿Estás seguro de que quieres eliminar el producto "${producto.item}"?`)) {
        return;
    }
    
    try {
        // Mostrar indicador de carga
        mostrarCargando(true);
        
        // Eliminar de IndexedDB
        await ManejadorDB.eliminarProducto(id);
        
        // Eliminar del array local
        productos = productos.filter(p => p.id !== id);
        productosMap.delete(id);
        
        // Actualizar la interfaz
        actualizarTablaProductos();
        actualizarEstadisticas();
        
        // Mostrar mensaje de confirmación
        mostrarMensajeExito(`Producto "${producto.item}" eliminado correctamente`);
        
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        mostrarMensajeError('Error al eliminar el producto de la base de datos');
    } finally {
        mostrarCargando(false);
    }
}

/**
 * Elimina todos los productos del almacén
 */
async function eliminarTodosLosProductos() {
    // Confirmar eliminación
    if (productos.length === 0) {
        alert('No hay productos para eliminar');
        return;
    }
    
    if (!confirm(`¿Estás seguro de que quieres eliminar TODOS los productos (${productos.length} productos)? Esta acción no se puede deshacer.`)) {
        return;
    }
    
    try {
        // Mostrar indicador de carga
        mostrarCargando(true);
        
        // Eliminar todos de IndexedDB
        await ManejadorDB.eliminarTodos();
        
        // Limpiar arrays locales
        productos = [];
        productosMap.clear();
        
        // Actualizar la interfaz
        actualizarTablaProductos();
        actualizarEstadisticas();
        
        // Mostrar mensaje de confirmación
        mostrarMensajeExito('Todos los productos han sido eliminados');
        
    } catch (error) {
        console.error('Error al eliminar todos los productos:', error);
        mostrarMensajeError('Error al eliminar los productos de la base de datos');
    } finally {
        mostrarCargando(false);
    }
}

/**
 * Actualiza la tabla de productos
 */
function actualizarTablaProductos() {
    // Limpiar el cuerpo de la tabla
    productsTableBody.innerHTML = '';
    
    // Si no hay productos, mostrar mensaje
    if (productos.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" class="empty-message">
                No hay productos en el almacén. Agrega el primero usando el formulario.
            </td>
        `;
        productsTableBody.appendChild(emptyRow);
        return;
    }
    
    // Agregar cada producto a la tabla
    productos.forEach(producto => {
        const trProducto = producto.devolverTRProducto();
        
        // Modificar el botón de eliminar para incluir el ID
        const deleteButton = trProducto.querySelector('.delete');
        if (deleteButton && producto.id) {
            deleteButton.setAttribute('data-id', producto.id);
        }
        
        productsTableBody.appendChild(trProducto);
    });
}

/**
 * Busca productos por término
 * @param {string} termino - Término de búsqueda
 */
async function buscarProductos(termino) {
    if (!termino || termino.trim() === '') {
        // Si no hay término, mostrar todos los productos
        await cargarProductosDesdeDB();
        actualizarTablaProductos();
        return;
    }
    
    try {
        // Buscar en item y marca
        const resultadosItem = await ManejadorDB.buscarProductos('item', termino);
        const resultadosMarca = await ManejadorDB.buscarProductos('marca', termino);
        
        // Combinar resultados únicos
        const resultadosUnicos = [...resultadosItem, ...resultadosMarca]
            .filter((prod, index, self) => 
                index === self.findIndex(p => p.id === prod.id)
            );
        
        // Convertir a instancias de Producto
        productos = resultadosUnicos.map(prodDB => {
            const producto = new Producto(
                prodDB.item,
                prodDB.cantidad,
                prodDB.precioUnidad,
                prodDB.marca
            );
            producto.id = prodDB.id;
            return producto;
        });
        
        // Actualizar tabla
        actualizarTablaProductos();
        
        // Mostrar mensaje si no hay resultados
        if (productos.length === 0) {
            mostrarMensajeInfo(`No se encontraron productos para "${termino}"`);
        }
        
    } catch (error) {
        console.error('Error al buscar productos:', error);
    }
}

/**
 * Muestra estadísticas avanzadas
 */
async function mostrarEstadisticasAvanzadas() {
    try {
        const stats = await ManejadorDB.obtenerEstadisticas();
        
        // Crear modal para mostrar estadísticas
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>📊 Estadísticas Avanzadas del Almacén</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Productos Totales</h3>
                        <p class="stat-value">${stats.totalProductos}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Artículos en Stock</h3>
                        <p class="stat-value">${stats.totalArticulos}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Valor Total Inventario</h3>
                        <p class="stat-value">${stats.valorTotal.toFixed(2)} €</p>
                    </div>
                    <div class="stat-card">
                        <h3>Valor Promedio por Producto</h3>
                        <p class="stat-value">${stats.valorPromedioProducto.toFixed(2)} €</p>
                    </div>
                </div>
                
                ${stats.productoMasCaro ? `
                <div class="highlight-stat">
                    <h3>⭐ Producto Más Valioso</h3>
                    <p><strong>${stats.productoMasCaro.item}</strong> (${stats.productoMasCaro.marca})</p>
                    <p>Precio: ${stats.productoMasCaro.precioUnidad.toFixed(2)} € | Stock: ${stats.productoMasCaro.cantidad}</p>
                </div>
                ` : ''}
                
                <div class="brands-section">
                    <h3>📈 Productos por Marca</h3>
                    <ul class="brands-list">
                        ${Object.entries(stats.productosPorMarca).map(([marca, cantidad]) => `
                            <li><span class="brand-name">${marca}</span> <span class="brand-count">${cantidad} productos</span></li>
                        `).join('')}
                    </ul>
                </div>
                
                <p class="stats-timestamp">Consultado: ${new Date(stats.fechaConsulta).toLocaleString()}</p>
                
                <button class="btn btn-primary close-modal">Cerrar</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Estilos para el modal
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                animation: fadeIn 0.3s;
            }
            
            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
            }
            
            .stat-card {
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 10px;
                text-align: center;
            }
            
            .stat-card h3 {
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
                opacity: 0.9;
            }
            
            .stat-value {
                font-size: 2rem;
                font-weight: bold;
            }
            
            .highlight-stat {
                background-color: #e8f4fc;
                padding: 1.5rem;
                border-radius: 10px;
                margin: 1.5rem 0;
                border-left: 4px solid #3498db;
            }
            
            .brands-section {
                margin: 2rem 0;
            }
            
            .brands-list {
                list-style: none;
                padding: 0;
            }
            
            .brands-list li {
                display: flex;
                justify-content: space-between;
                padding: 0.8rem;
                border-bottom: 1px solid #eee;
            }
            
            .stats-timestamp {
                text-align: center;
                color: #7f8c8d;
                font-size: 0.9rem;
                margin: 1rem 0;
            }
            
            .close-modal {
                display: block;
                margin: 2rem auto 0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Cerrar al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        mostrarMensajeError('Error al cargar estadísticas');
    }
}

/**
 * Actualiza las estadísticas en la interfaz
 */
function actualizarEstadisticas() {
    // Calcular total de productos
    const totalProductos = productos.length;
    totalProductsElement.textContent = totalProductos;
    
    // Calcular total de artículos en stock
    const totalArticulos = productos.reduce((total, producto) => total + producto.cantidad, 0);
    totalItemsElement.textContent = totalArticulos;
    
    // Calcular valor total del inventario
    const valorTotalInventario = productos.reduce((total, producto) => total + producto.getValorTotal(), 0);
    totalInventoryValueElement.textContent = valorTotalInventario.toFixed(2) + ' €';
}

/**
 * Muestra/oculta indicador de carga
 */
function mostrarCargando(mostrar) {
    let spinner = document.getElementById('loadingSpinner');
    
    if (mostrar) {
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.id = 'loadingSpinner';
            spinner.innerHTML = `
                <div class="spinner"></div>
                <p>Cargando...</p>
            `;
            spinner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.8);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            const spinnerStyle = document.createElement('style');
            spinnerStyle.textContent = `
                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyle);
            spinner.dataset.styleId = 'spinnerStyle';
            
            document.body.appendChild(spinner);
        }
    } else if (spinner) {
        document.body.removeChild(spinner);
        const style = document.querySelector(`style[data-style-id="spinnerStyle"]`);
        if (style) document.head.removeChild(style);
    }
}

/**
 * Carga desde localStorage como fallback
 */
function cargarDesdeLocalStorage() {
    const productosGuardados = localStorage.getItem('productosAlmacen');
    
    if (productosGuardados) {
        try {
            const datos = JSON.parse(productosGuardados);
            productos = datos.map(d => new Producto(d.item, d.cantidad, d.precioUnidad, d.marca));
            actualizarTablaProductos();
            actualizarEstadisticas();
            mostrarMensajeInfo('Datos cargados desde caché local (IndexedDB no disponible)');
        } catch (error) {
            console.error('Error al cargar desde localStorage:', error);
        }
    }
}

/**
 * Guarda en localStorage como backup
 */
function guardarEnLocalStorage() {
    try {
        const datos = productos.map(p => ({
            item: p.item,
            cantidad: p.cantidad,
            precioUnidad: p.precioUnidad,
            marca: p.marca
        }));
        localStorage.setItem('productosAlmacen', JSON.stringify(datos));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Resto de funciones auxiliares permanecen iguales...

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    agregarEstilosAnimacion();
    inicializarApp();
    
    // Guardar en localStorage periódicamente como backup
    setInterval(guardarEnLocalStorage, 30000); // Cada 30 segundos
});