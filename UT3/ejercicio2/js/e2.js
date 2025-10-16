// 1) Selecciona el primer enlace ("a") que cuelgue #div1.Pinta su atributo title(.getAttribute("title") o .title) por pantalla

primerEnlace = document.querySelector("#div1 a");
console.log(primerEnlace ? primerEnlace.title : "No hay enlace");

// 2) Selecciona un enlace ("a") que sea hijo inmediato de cualquier div[Debería fallar].
let enlace = document.querySelectorAll("div > a");
console.log(enlace.title);

// 3) Selecciona el enlace que sea hijo de primer nivel de un párrafo, que sea hijo de primer nivel de #div1. Muestra por pantalla su contenido.

let enlaceHijo = document.querySelector("#div1 > p > a");
console.log(enlaceHijo ? enlaceHijo.textContent : "No hay enlace");

// 4) Selecciona el segundo elemento de la clase "linkNormal". Muestra por consola su enlace.

let segundoElemento = document.querySelector(".linkNormal[title=Spiderman]");
console.log(segundoElemento ? segundoElemento.href : "No hay enlace");

// 5) Selecciona un elemento de la clase "linkNormal" cuyo atributo title empiece por "Spider". Muestra por pantalla de qué tipo es ese nodo y cuál es su contenido HTML (innerHTML).

let elementoClase = document.querySelector(".linkNormal[title^=Spider]");

console.log(elementoClase.nodeType);
console.log(elementoClase.innerHTML);

// 6) Selecciona el elemento siguiente de tipo "a" que es hermano de un elemento de la clase "linkNormal" cuyo atributo title empieza por "Spider". Píntalo por consola.

let elementoSiguiente = document.querySelector(".linkNormal + a[title^=Spider]");
console.log(elementoSiguiente);

// 7) Pinta por pantalla todos los "titles" de los elementos que sean de la clase "linkNormal".

let todosTitles = document.querySelectorAll(".linkNormal[title]");
todosTitles.forEach(titulos => console.log(titulos.title));

// 8) Pinta todos los elementos "a" que sean hermanos (anteriores y posteriores) del enlace que tenga como título "Spiderman".

let enlaceSpiderman = document.querySelector('a[title="Spiderman"]');
if (enlaceSpiderman) {
    // Hermanos anteriores
    let hermano = enlaceSpiderman.previousElementSibling;
    while (hermano) {
        if (hermano.tagName === "A") {
            console.log(hermano.title);
        }
        hermano = hermano.previousElementSibling;
    }
    // Hermanos posteriores
    hermano = enlaceSpiderman.nextElementSibling;
    while (hermano) {
        if (hermano.tagName === "A") {
            console.log(hermano.title);
        }
        hermano = hermano.nextElementSibling;
    }
} else {
    console.log("No se encontró el enlace con título 'Spiderman'");
}