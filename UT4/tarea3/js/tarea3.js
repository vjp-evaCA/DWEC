// URLs para conseguir los datos de la API
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

// Donde vamos a meter los posts
const entradasContainer = document.getElementById('entradas');

// Crear cada post con su título y contenido
function crearPost(post) {
    let div = document.createElement("div");
    div.classList.add("entrada");

    // HTML de cada post
    div.innerHTML = `
        <div class="titulo-post">
            <p><strong>TITULO</strong>: ${post.title}</p>
        </div>
        <div class="contenido-post">
            <p><strong>Contenido</strong>: ${post.body}</p>
        </div>
        <div class="botones">
            <button class="mostrarUsuario">Usuario del Post</button>
            <button class="mostrarComentarios">Mostrar comentarios</button>
        </div>
        <div class="usuario oculto">
            <p><strong>NOMBRE USUARIO: </strong> <span id="nombreUser">Nombre</span></p>
        </div>
        <div class="comentarios oculto">
            <p><strong>Comentarios: </strong></p>
            <div class="lista-comentarios"></div>
        </div>
    `;

    // Cuando haces click en "Usuario del Post"
    div.querySelector(".mostrarUsuario").addEventListener("click", function () {
        let usuarioDiv = div.querySelector(".usuario");
        // Si está oculto, cargar el usuario
        if (usuarioDiv.classList.contains("oculto")) {
            cargarUsuario(post.userId, div);
        }
        // Mostrar u ocultar
        usuarioDiv.classList.toggle("oculto");
    });

    // Cuando haces click en "Mostrar comentarios"
    div.querySelector(".mostrarComentarios").addEventListener("click", function () {
        let comentariosDiv = div.querySelector(".comentarios");
        // Si está oculto, cargar los comentarios
        if (comentariosDiv.classList.contains("oculto")) {
            cargarComentarios(post.id, div);
        }
        // Mostrar u ocultar
        comentariosDiv.classList.toggle("oculto");
    });

    return div;
}

// Conseguir datos del usuario
function cargarUsuario(userId, div) {
    fetch(USERS_URL + '/' + userId)
        .then(response => response.json())
        .then(usuario => {
            // Poner el nombre en la página
            const nombreUsuario = div.querySelector('#nombreUser');
            nombreUsuario.textContent = usuario.name;
        });
}

// Conseguir comentarios del post
function cargarComentarios(postId, div) {
    fetch(COMMENTS_URL + '?postId=' + postId)
        .then(response => response.json())
        .then(comentarios => {
            const listaComentarios = div.querySelector('.lista-comentarios');
            // Vaciar la lista primero
            listaComentarios.innerHTML = '';

            // Añadir cada comentario
            comentarios.forEach(comentario => {
                let p = document.createElement('p');
                p.textContent = '- ' + comentario.name;
                listaComentarios.appendChild(p);
            });
        });
}

// Cargar todos los posts al empezar
function cargarPosts() {
    fetch(POSTS_URL)
        .then(response => response.json())
        .then(posts => {
            // Crear un elemento para cada post
            posts.forEach(post => {
                const postElement = crearPost(post);
                entradasContainer.appendChild(postElement);
            });
        });
}

// Empezar cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarPosts);