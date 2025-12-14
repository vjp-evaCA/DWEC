import Producto from './Producto.js';
import BaseDatos from './BaseDatos.js';

class Aplicacion {
    constructor() {
        this.iniciar();
    }
    
    async iniciar() {
        await BaseDatos.abrir();
        await this.cargarProductos();
        await this.agregarEjemplos();
        this.configurarEventos();
    }
    
    async cargarProductos() {
        const productos = await BaseDatos.obtenerTodos();
        this.mostrarProductos(productos);
    }
    
    mostrarProductos(productos) {
        const lista = document.getElementById('listaProductos');
        const mensaje = document.getElementById('mensajeVacio');
        
        lista.innerHTML = '';
        
        if (productos.length === 0) {
            mensaje.style.display = 'block';
            return;
        }
        
        mensaje.style.display = 'none';
        
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
    
    configurarEventos() {
        const form = document.getElementById('formProducto');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.agregarProducto();
        });
    }
    
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
    
    limpiarFormulario() {
        document.getElementById('formProducto').reset();
        this.limpiarErrores();
        this.limpiarMensaje();
    }
    
    mostrarError(id, mensaje) {
        const elemento = document.getElementById(id);
        elemento.textContent = mensaje;
    }
    
    limpiarErrores() {
        document.querySelectorAll('.error').forEach(el => {
            el.textContent = '';
        });
    }
    
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
    
    limpiarMensaje() {
        document.getElementById('mensajeExito').textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Aplicacion();
});