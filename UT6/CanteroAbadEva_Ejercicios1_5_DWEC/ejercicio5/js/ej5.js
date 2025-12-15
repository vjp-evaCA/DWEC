// Módulos: modelo `Producto` y utilidades de almacenamiento
import Producto from './Producto.js';
import BaseDatos from './BaseDatos.js';

// Clase principal que gestiona la UI y la base de datos
class Aplicacion {
    constructor() {
        // Arranca la aplicación
        this.iniciar();
    }
    
    // Inicializa la BD, carga datos y configura eventos
    async iniciar() {
        await BaseDatos.abrir();
        await this.cargarProductos();
        await this.agregarEjemplos();
        this.configurarEventos();
    }
    
    // Recupera productos desde la BD y los muestra en la tabla
    async cargarProductos() {
        const productos = await BaseDatos.obtenerTodos();
        this.mostrarProductos(productos);
    }
    
    // Renderiza la lista de productos en el DOM
    mostrarProductos(productos) {
        const lista = document.getElementById('listaProductos');
        const mensaje = document.getElementById('mensajeVacio');
        
        lista.innerHTML = '';
        
        // Muestra mensaje si no hay productos
        if (productos.length === 0) {
            mensaje.style.display = 'block';
            return;
        }
        
        mensaje.style.display = 'none';
        
        // Crea filas por cada producto
        productos.forEach(productoDB => {
            const producto = new Producto(
                productoDB.item,
                productoDB.cantidad,
                productoDB.precioUnidad,
                productoDB.marca
            );
            const fila = Producto.crearFila(producto);
            lista.appendChild(fila);
        });
    }
    
    // Añade productos de ejemplo si la BD está vacía
    async agregarEjemplos() {
        const productos = await BaseDatos.obtenerTodos();

        if (productos.length === 0) {
            const ejemplos = [
                new Producto("Sudadera", 20, 79, 'kaotiko'),
                new Producto('Pantalón', 10, 20, 'Stradivarius')
            ];

            for (const ejemplo of ejemplos) {
                await BaseDatos.guardar(ejemplo);
            }

            await this.cargarProductos();
        }
    }
    
    // Evento: envío del formulario
    configurarEventos() {
        const form = document.getElementById('formProducto');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.agregarProducto();
        });
    }
    
    // Lee formulario, valida y guarda el producto en la BD
    async agregarProducto() {
        const item = document.getElementById('item').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precioUnidad').value;
        const marca = document.getElementById('marca').value;

        if (!this.validarFormulario()) {
            return;
        }

        const producto = new Producto(item, cantidad, precio, marca);
        await BaseDatos.guardar(producto);

        this.mostrarMensaje('Producto añadido', true);
        await this.cargarProductos();
        this.limpiarFormulario();
    }
    
    // Validación simple del formulario
    validarFormulario() {
        this.limpiarErrores();
        let valido = true;

        const item = document.getElementById('item').value.trim();
        if (!item) {
            this.mostrarError('errorItem', 'El nombre es obligatorio');
            valido = false;
        }

        const cantidad = document.getElementById('cantidad').value;
        if (!cantidad || cantidad < 0) {
            this.mostrarError('errorCantidad', 'Cantidad no válida');
            valido = false;
        }

        const precio = document.getElementById('precioUnidad').value;
        if (!precio || precio < 0) {
            this.mostrarError('errorPrecio', 'Precio no válido');
            valido = false;
        }

        return valido;
    }
    
    // Resetea el formulario y oculta mensajes/errores
    limpiarFormulario() {
        document.getElementById('formProducto').reset();
        this.limpiarErrores();
        this.limpiarMensaje();
    }
    
    // Muestra texto de error en el elemento indicado
    mostrarError(id, mensaje) {
        const elemento = document.getElementById(id);
        elemento.textContent = mensaje;
    }
    
    // Limpia todos los mensajes de error
    limpiarErrores() {
        document.querySelectorAll('.error').forEach(el => {
            el.textContent = '';
        });
    }
    
    // Muestra un mensaje temporal de éxito o error
    mostrarMensaje(mensaje, esExito) {
        const elemento = document.getElementById('mensajeExito');
        elemento.textContent = mensaje;
        elemento.style.color = esExito ? '#4CAF50' : '#f44336';

        if (esExito) {
            setTimeout(() => {
                elemento.textContent = '';
            }, 3000);
        }
    }
    
    // Borra el mensaje de estado
    limpiarMensaje() {
        document.getElementById('mensajeExito').textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Aplicacion();
});