import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Update the import path to match the actual file location and extension, e.g.:
// Update the path below if your file is named differently or in another folder
import { ListaProductos } from './lista-productos/lista-productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaProductos],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('Mi primera App con Angular');
}
