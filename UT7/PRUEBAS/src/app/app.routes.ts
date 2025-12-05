import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos';

export const routes: Routes = [
  { path: 'productos', component: ListaProductosComponent },
  // o
  { path: '', component: ListaProductosComponent } // para ruta principal
];