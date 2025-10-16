// Colores en orden: rojo, azul, verde, amarillo
const colores = ['red', 'blue', 'green', 'yellow'];
let indiceColor = 0;

function crearBoton() {
    const boton = document.createElement('button');
    boton.style.width = '25px';
    boton.style.height = '25px';
    boton.style.margin = '10px';
    boton.style.border = '1px solid #ccc';
    boton.style.backgroundColor = '#fff';

    asignarEvento(boton);

    return boton;
}

function asignarEvento(boton) {
    
    boton.addEventListener('mousedown', function(event) {

        if (event.button === 0) { // Botón izquierdo
            this.style.backgroundColor = colores[indiceColor];
            indiceColor = (indiceColor + 1) % colores.length; // Avanza en sentido horario
        } else if (event.button === 2) { // Botón derecho
            this.style.backgroundColor = colores[indiceColor];
            indiceColor = (indiceColor - 1 + colores.length) % colores.length;  // Retrocede (sentido opuesto)
        } else if (event.button === 1) { // // Botón de la rueda
            this.style.backgroundColor = 'gray';    
        }

    })

}

function crearMatriz() {
    
    const contenedor = document.getElementById("contenedorGeneral");

    for (let i = 0; i < 10; i++) {
       
        for (let j = 0; j < 10; j++) {
            
            const boton = crearBoton();
            contenedor.appendChild(boton);

        }

        contenedor.appendChild(document.createElement('br'));

    }

}

window.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener('DOMContentLoaded', crearMatriz);