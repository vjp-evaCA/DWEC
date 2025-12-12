/**
 * Clase ManejadorDB para gestionar la base de datos IndexedDB
 * Ejercicio 5 - IndexedDB: Parte 2
 */
'use strict';

// Constantes para la configuración de la base de datos
const nombreDB = 'Products';
const versionDB = 1;
const nombreAlmacen = 'AlmacenProducts';
let db = null; // Variable local para la base de datos

class ManejadorDB {
    
    /**
     * Devuelve una Promise con la apertura de la BD
     * @returns {Promise<IDBDatabase>} Promise con la base de datos abierta
     */
    static abrirDB() {
        return new Promise((resolve, reject) => {
            // Verificar si IndexedDB está disponible en el navegador
            if (!window.indexedDB) {
                reject(new Error("Tu navegador no soporta IndexedDB"));
                return;
            }
            
            // Solicitar la apertura de la base de datos
            const solicitud = indexedDB.open(nombreDB, versionDB);
            
            // Evento cuando la base de datos se abre por primera vez o necesita actualización
            solicitud.onupgradeneeded = (evento) => {
                db = evento.target.result;
                
                // Crear el almacén de objetos si no existe
                if (!db.objectStoreNames.contains(nombreAlmacen)) {
                    const almacen = db.createObjectStore(nombreAlmacen, { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    
                    // Crear índices para búsquedas más eficientes
                    almacen.createIndex('item', 'item', { unique: false });
                    almacen.createIndex('marca', 'marca', { unique: false });
                    almacen.createIndex('precio', 'precioUnidad', { unique: false });
                    
                    console.log('Almacén de productos creado con éxito');
                }
            };
            
            // Evento cuando la base de datos se abre con éxito
            solicitud.onsuccess = (evento) => {
                db = evento.target.result;
                console.log('Base de datos abierta con éxito');
                resolve(db);
            };
            
            // Evento cuando ocurre un error al abrir la base de datos
            solicitud.onerror = (evento) => {
                console.error('Error al abrir la base de datos:', evento.target.error);
                reject(evento.target.error);
            };
        });
    }
    
    /**
     * Devuelve una Promise para obtener todos los productos de la BD
     * @returns {Promise<Array>} Promise con todos los productos
     */
    static obtenerTodosProductos() {
        return new Promise(async (resolve, reject) => {
            try {
                // Asegurarse de que la base de datos esté abierta
                if (!db) {
                    await this.abrirDB();
                }
                
                // Iniciar una transacción de solo lectura
                const transaccion = db.transaction([nombreAlmacen], 'readonly');
                const almacen = transaccion.objectStore(nombreAlmacen);
                
                // Obtener todos los productos
                const solicitud = almacen.getAll();
                
                solicitud.onsuccess = (evento) => {
                    resolve(evento.target.result);
                };
                
                solicitud.onerror = (evento) => {
                    console.error('Error al obtener productos:', evento.target.error);
                    reject(evento.target.error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Devuelve una Promise para insertar un producto
     * @param {Object} nuevoProducto - Objeto con los datos del producto
     * @returns {Promise<number>} Promise con el ID del producto insertado
     */
    static insertar(nuevoProducto) {
        return new Promise(async (resolve, reject) => {
            try {
                // Asegurarse de que la base de datos esté abierta
                if (!db) {
                    await this.abrirDB();
                }
                
                // Validar el producto
                if (!nuevoProducto || typeof nuevoProducto !== 'object') {
                    reject(new Error('Producto inválido'));
                    return;
                }
                
                // Asegurarse de que el producto tenga los campos necesarios
                const producto = {
                    item: nuevoProducto.item || '-',
                    cantidad: nuevoProducto.cantidad || 0,
                    precioUnidad: nuevoProducto.precioUnidad || 0,
                    marca: nuevoProducto.marca || '-',
                    fechaRegistro: new Date().toISOString()
                };
                
                // Iniciar una transacción de lectura/escritura
                const transaccion = db.transaction([nombreAlmacen], 'readwrite');
                const almacen = transaccion.objectStore(nombreAlmacen);
                
                // Insertar el producto
                const solicitud = almacen.add(producto);
                
                solicitud.onsuccess = (evento) => {
                    console.log('Producto insertado con ID:', evento.target.result);
                    resolve(evento.target.result); // Devuelve el ID asignado
                };
                
                solicitud.onerror = (evento) => {
                    console.error('Error al insertar producto:', evento.target.error);
                    reject(evento.target.error);
                };
                
                // Manejar el cierre de la transacción
                transaccion.oncomplete = () => {
                    console.log('Transacción de inserción completada');
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Elimina todos los productos de la base de datos
     * @returns {Promise<void>} Promise que se resuelve cuando se eliminan todos los productos
     */
    static eliminarTodos() {
        return new Promise(async (resolve, reject) => {
            try {
                // Asegurarse de que la base de datos esté abierta
                if (!db) {
                    await this.abrirDB();
                }
                
                // Iniciar una transacción de lectura/escritura
                const transaccion = db.transaction([nombreAlmacen], 'readwrite');
                const almacen = transaccion.objectStore(nombreAlmacen);
                
                // Eliminar todos los productos
                const solicitud = almacen.clear();
                
                solicitud.onsuccess = (evento) => {
                    console.log('Todos los productos eliminados');
                    resolve();
                };
                
                solicitud.onerror = (evento) => {
                    console.error('Error al eliminar productos:', evento.target.error);
                    reject(evento.target.error);
                };
                
                // Manejar el cierre de la transacción
                transaccion.oncomplete = () => {
                    console.log('Transacción de eliminación completada');
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Elimina un producto específico por su ID
     * @param {number} id - ID del producto a eliminar
     * @returns {Promise<void>} Promise que se resuelve cuando se elimina el producto
     */
    static eliminarProducto(id) {
        return new Promise(async (resolve, reject) => {
            try {
                // Asegurarse de que la base de datos esté abierta
                if (!db) {
                    await this.abrirDB();
                }
                
                // Iniciar una transacción de lectura/escritura
                const transaccion = db.transaction([nombreAlmacen], 'readwrite');
                const almacen = transaccion.objectStore(nombreAlmacen);
                
                // Eliminar el producto por ID
                const solicitud = almacen.delete(id);
                
                solicitud.onsuccess = (evento) => {
                    console.log(`Producto con ID ${id} eliminado`);
                    resolve();
                };
                
                solicitud.onerror = (evento) => {
                    console.error('Error al eliminar producto:', evento.target.error);
                    reject(evento.target.error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Actualiza un producto existente
     * @param {number} id - ID del producto a actualizar
     * @param {Object} productoActualizado - Objeto con los datos actualizados
     * @returns {Promise<void>} Promise que se resuelve cuando se actualiza el producto
     */
    static actualizarProducto(id, productoActualizado) {
        return new Promise(async (resolve, reject) => {
            try {
                // Asegurarse de que la base de datos esté abierta
                if (!db) {
                    await this.abrirDB();
                }
                
                // Iniciar una transacción de lectura/escritura
                const transaccion = db.transaction([nombreAlmacen], 'readwrite');
                const almacen = transaccion.objectStore(nombreAlmacen);
                
                // Obtener el producto existente
                const solicitudGet = almacen.get(id);
                
                solicitudGet.onsuccess = (evento) => {
                    const productoExistente = evento.target.result;
                    
                    if (!productoExistente) {
                        reject(new Error(`Producto con ID ${id} no encontrado`));
                        return;
                    }
                    
                    // Actualizar los campos del producto
                    const productoActualizadoCompleto = {
                        ...productoExistente,
                        ...productoActualizado,
                        id: id, // Mantener el mismo ID
                        fechaActualizacion: new Date().toISOString()
                    };
                    
                    // Guardar el producto actualizado
                    const solicitudPut = almacen.put(productoActualizadoCompleto);
                    
                    solicitudPut.onsuccess = () => {
                        console.log(`Producto con ID ${id} actualizado`);
                        resolve();
                    };
                    
                    solicitudPut.onerror = (eventoPut) => {
                        console.error('Error al actualizar producto:', eventoPut.target.error);
                        reject(eventoPut.target.error);
                    };
                };
                
                solicitudGet.onerror = (evento) => {
                    console.error('Error al obtener producto para actualizar:', evento.target.error);
                    reject(evento.target.error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Busca productos por criterios específicos
     * @param {string} campo - Campo por el que buscar (item, marca, etc.)
     * @param {string} valor - Valor a buscar
     * @returns {Promise<Array>} Promise con los productos encontrados
     */
    static buscarProductos(campo, valor) {
        return new Promise(async (resolve, reject) => {
            try {
                // Asegurarse de que la base de datos esté abierta
                if (!db) {
                    await this.abrirDB();
                }
                
                // Iniciar una transacción de solo lectura
                const transaccion = db.transaction([nombreAlmacen], 'readonly');
                const almacen = transaccion.objectStore(nombreAlmacen);
                
                let solicitud;
                
                // Si se especifica un campo, usar el índice correspondiente
                if (campo && valor) {
                    if (!almacen.indexNames.contains(campo)) {
                        reject(new Error(`Índice ${campo} no existe`));
                        return;
                    }
                    
                    const indice = almacen.index(campo);
                    const rango = IDBKeyRange.only(valor);
                    solicitud = indice.getAll(rango);
                } else {
                    // Si no se especifica criterio, obtener todos
                    solicitud = almacen.getAll();
                }
                
                solicitud.onsuccess = (evento) => {
                    resolve(evento.target.result);
                };
                
                solicitud.onerror = (evento) => {
                    console.error('Error al buscar productos:', evento.target.error);
                    reject(evento.target.error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Obtiene estadísticas de la base de datos
     * @returns {Promise<Object>} Promise con estadísticas
     */
    static obtenerEstadisticas() {
        return new Promise(async (resolve, reject) => {
            try {
                // Obtener todos los productos
                const productos = await this.obtenerTodosProductos();
                
                // Calcular estadísticas
                const totalProductos = productos.length;
                const totalArticulos = productos.reduce((total, prod) => total + (prod.cantidad || 0), 0);
                const valorTotal = productos.reduce((total, prod) => {
                    return total + ((prod.cantidad || 0) * (prod.precioUnidad || 0));
                }, 0);
                
                // Encontrar producto más caro y más barato
                const productosConPrecio = productos.filter(p => p.precioUnidad > 0);
                const productoMasCaro = productosConPrecio.length > 0 
                    ? productosConPrecio.reduce((max, p) => p.precioUnidad > max.precioUnidad ? p : max)
                    : null;
                    
                const productoMasBarato = productosConPrecio.length > 0
                    ? productosConPrecio.reduce((min, p) => p.precioUnidad < min.precioUnidad ? p : min)
                    : null;
                
                // Agrupar por marca
                const productosPorMarca = productos.reduce((agrupados, prod) => {
                    const marca = prod.marca || 'Sin marca';
                    if (!agrupados[marca]) agrupados[marca] = 0;
                    agrupados[marca]++;
                    return agrupados;
                }, {});
                
                resolve({
                    totalProductos,
                    totalArticulos,
                    valorTotal,
                    valorPromedioProducto: totalProductos > 0 ? valorTotal / totalProductos : 0,
                    productoMasCaro,
                    productoMasBarato,
                    productosPorMarca,
                    fechaConsulta: new Date().toISOString()
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Cierra la conexión con la base de datos
     */
    static cerrarDB() {
        if (db) {
            db.close();
            db = null;
            console.log('Base de datos cerrada');
        }
    }
}