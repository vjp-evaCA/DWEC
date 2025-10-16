window.addEventListener("DOMContentLoaded", function () {

    let divContenedor = document.getElementById("contenedorGeneral");

    divContenedor.style.width = "200px";
    divContenedor.style.height = "200px";

    divContenedor.style.backgroundColor = "#9e9e9e";
    divContenedor.style.color = "blue";
    divContenedor.style.border = "1px solid red";

    this.window.addEventListener("resize", function () {
        divContenedor.innerText = this.window.innerWidth + " - " + this.window.innerHeight;
    })

});
