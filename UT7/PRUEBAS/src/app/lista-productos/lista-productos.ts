import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- AÑADE ESTO

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.html',
  styleUrls: ['./lista-productos.css'],
  imports: [CommonModule] // <-- AÑADE ESTO para *ngFor y currency pipe
})
export class ListaProductosComponent { // <-- ¡NO ListaProductos (sin Component)!
  titulo = 'Lista de Productos';
  
  cabeceras = {
    description: 'Descripción',
    precio: 'Precio',
    disponibilidad: 'Disponibilidad'
  };

  productos = [
    {
      description: 'Producto Ejemplo 1',
      precio: 29.99,
      disponible: true
    },
    {
      description: 'Producto Ejemplo 2',
      precio: 49.99,
      disponible: false
    },
    {
      description: 'Producto Ejemplo 3',
      precio: 19.99,
      disponible: true
    }
  ];
}