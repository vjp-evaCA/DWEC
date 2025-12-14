const nombreBD = 'ProductosDB';
const version = 1;
const almacen = 'productos';
let db = null;

class BaseDatos {
    static abrir() {
        return new Promise((resolve, reject) => {
            const solicitud = indexedDB.open(nombreBD, version);
            
            solicitud.onerror = () => {
                reject('Error');
            };
            
            solicitud.onsuccess = (e) => {
                db = e.target.result;
                resolve(db);
            };
            
            solicitud.onupgradeneeded = (e) => {
                db = e.target.result;
                if (!db.objectStoreNames.contains(almacen)) {
                    db.createObjectStore(almacen, { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }
    
    static obtenerTodos() {
        return new Promise((resolve, reject) => {
            const transaccion = db.transaction([almacen], 'readonly');
            const almacenObj = transaccion.objectStore(almacen);
            const solicitud = almacenObj.getAll();
            
            solicitud.onerror = () => {
                reject('Error');
            };
            
            solicitud.onsuccess = (e) => {
                resolve(e.target.result);
            };
        });
    }
    
    static guardar(producto) {
        return new Promise((resolve, reject) => {
            const transaccion = db.transaction([almacen], 'readwrite');
            const almacenObj = transaccion.objectStore(almacen);
            const solicitud = almacenObj.add(producto);
            
            solicitud.onerror = () => {
                reject('Error');
            };
            
            solicitud.onsuccess = (e) => {
                resolve(e.target.result);
            };
        });
    }
}

export default BaseDatos;