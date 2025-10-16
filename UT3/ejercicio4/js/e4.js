// Modifica los estilos desde JavaScript para que el div cumpla:
// 1) Que el box-sizing del div sea "border-box".

let div = document.querySelector("div");
div.style.boxSizing = "border-box";

// 2) Que su ancho máximo sea 200px.
div.style.maxWidth = "200px";

// 3) Que tenga como padding en todos lados 50px;
div.style.padding ="50px";

// 4) Que el color del texto sea blanco.
div.style.color ="white";

// 5) Que el fondo sea rojo.
div.style.backgroundColor = "red";