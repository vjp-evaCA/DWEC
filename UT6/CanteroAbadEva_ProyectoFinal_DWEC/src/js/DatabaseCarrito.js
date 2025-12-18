// DatabaseCarrito.js - Gestiona IndexedDB para el carrito
class DatabaseCarrito {
    static DB_NAME = 'MiniMarketCarritoDB';
    static DB_VERSION = 1;
    static STORE_NAME = 'carrito';

    /**
     * Abre la base de datos IndexedDB
     */
    static openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, { 
                        keyPath: 'id',
                        autoIncrement: false 
                    });
                    store.createIndex('titulo', 'titulo', { unique: false });
                    store.createIndex('precio', 'precio', { unique: false });
                }
            };
        });
    }

    /**
     * Obtiene todos los productos del carrito
     */
    static getAllProducts(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                const productos = request.result.map((prod, index) => ({
                    ...prod,
                    key: index
                }));
                resolve(productos);
            };
        });
    }

    /**
     * Elimina la base de datos (para testing)
     */
    static deleteDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(this.DB_NAME);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * Obtiene un producto por su ID
     */
    static getProduct(db, id) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.get(id);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    /**
     * Inserta un producto en el carrito
     */
    static insertProduct(db, producto) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.add(producto);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * Actualiza un producto en el carrito
     */
    static updateProduct(db, producto, key = null) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.put(producto);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    /**
     * Elimina un producto del carrito
     */
    static deleteProduct(db, id) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.delete(id);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
}

module.exports = { DatabaseCarrito };