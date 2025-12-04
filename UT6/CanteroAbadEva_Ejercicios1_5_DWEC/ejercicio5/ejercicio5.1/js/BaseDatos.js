'use strict';

const BD_NOMBRE = 'AlmacenProductos';
const BD_VERSION = 1;
const NOMBRE_OBJETO = 'productos';

class BaseDatos {
    constructor() {
        this.db = null;
        this.inicializarBD();
    }

    inicializarBD() {
        const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION);

        solicitud.onerror = (event) => {
            console.error('Error al abrir la base de datos:', event.target.error);
        };

        solicitud.onsuccess = (event) => {
            this.db = event.target.result;
            console.log('Base de datos abierta con éxito');
            this.cargarProductos();
        };

        solicitud.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Crear almacén si no existe
            if (!db.objectStoreNames.contains(NOMBRE_OBJETO)) {
                const objectStore = db.createObjectStore(NOMBRE_OBJETO, { keyPath: 'item'});

                objectStore.createIndex('marca', 'marca',{unique: false });
                objectStore.createIndex('cantidad', 'cantidad', {unique: false});
                console.log('Almacén de objetos creados');
            }
        };
    }

    agregarProducto(producto) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Base de datos no inicializada');
                return;
            }

            const transaction = this.db.transaction([NOMBRE_OBJETO], 'readwrite');
            const store = transaction.objectStore(NOMBRE_OBJETO);
            const solicitud = store.add(producto);

            solicitud.onsuccess = () => {
                resolver('Producto agregado con éxito');
            };

            solicitud.onerror = (event) => {
                // Si el producto ya existe,lo actualizamos
                if (event.target.error.name === 'ConstraintError') {
                    this.actualizarProducto(producto).then(resolve).cathch(reject);
                } else {
                    reject('Error al agregar producto: ' + event.target.error);
                }
            };
        });
    }

    obtenerProductos() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Base de datos no inicializada');
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject('Error al obtener productos: ' + event.target.error);
            };
        });
    }

    actualizarProducto(producto) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Base de datos no inicializada');
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(producto);

            request.onsuccess = () => {
                resolve('Producto actualizado correctamente');
            };

            request.onerror = (event) => {
                reject('Error al actualizar producto: ' + event.target.error);
            };
        });
    }

    eliminarProducto(item) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Base de datos no inicializada');
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(item);

            request.onsuccess = () => {
                resolve('Producto eliminado correctamente');
            };

            request.onerror = (event) => {
                reject('Error al eliminar producto: ' + event.target.error);
            };
        });
    }

    buscarProducto(item) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Base de datos no inicializada');
                return;
            }

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(item);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (event) => {
                reject('Error al buscar producto: ' + event.target.error);
            };
        });
    }

    cargarProductos() {
        this.obtenerProductos()
            .then(productos => {
                const tabla = document.getElementById('tablaProductos');
                const tbody = tabla.querySelector('tbody');
                tbody.innerHTML = '';

                productos.forEach(producto => {
                    const prod = new Producto(
                        producto.item,
                        producto.cantidad,
                        producto.precioUnidad,
                        producto.marca
                    );
                    tbody.innerHTML += prod.devolverTRProducto();
                });
            })
            .catch(error => console.error(error));
    }
}

// Crear instancia global
const baseDatos = new BaseDatos();