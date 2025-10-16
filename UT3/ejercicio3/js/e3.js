//Crea una función cambiarATwitter que haga lo siguiente:
function cambiarATwitter() {

    // 1) Seleccione el nodo a.
    let nodo = document.querySelector("a");

    // 2) Lo modifique para que su id sea "aTwitter".

    let id = nodo.id = "aTwitter";

    // 3) El enlace cambie a la dirección de twitter.

    nodo.href = "https://www.twitter.com";

    // 4) El contenido textual del nodo sea "Twitter".

    nodo.textContent = "Twitter";

    // 5) Compruebe que el nodo tiene el atributo "title" y solo en ese caso cambia el title a "Ir a Twitter". 

    if (nodo.hasAttribute("title")){
        nodo.title = "Ir a Twitter";
    } else{
        console.log("No tiene atributo title");
    }
    console.log(nodo);
}

cambiarATwitter();

