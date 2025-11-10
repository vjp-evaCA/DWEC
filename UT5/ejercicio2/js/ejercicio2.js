document.addEventListener('DOMContentLoaded', function () {
    // Estos son todos los elementos del HTML que voy a usar
    const tasksContainer = document.getElementById('tasksContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const showExampleBtn = document.getElementById('showExampleBtn');

    // Aquí guardo todas las tareas
    let allTasks = [];

    // Cuando se carga la página, llamo a esta función para cargar las tareas
    loadTasks();

    // Pongo los event listeners para que los botones funcionen
    searchInput.addEventListener('input', filterTasks);
    refreshBtn.addEventListener('click', loadTasks);
    if (showExampleBtn) {
        showExampleBtn.addEventListener('click', showExampleData);
    }

    // Esta función trae las tareas del servidor
    async function loadTasks() {
        // Muestro el mensaje de cargando
        showLoading();
        // Oculto los mensajes de error por si acaso
        hideError();
        hideNoResults();

        try {
            // Hago la petición al servidor
            const response = await fetch('http://localhost:3000/tasks');

            // Si el servidor responde con error, lanzo un error
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Convierto la respuesta a JSON
            allTasks = await response.json();
            // Muestro las tareas en pantalla
            displayTasks(allTasks);
            // Quito el mensaje de cargando
            hideLoading();
        } catch (error) {
            // Si hay error, lo muestro en consola y muestro el mensaje de error
            console.error('Error al cargar las tareas:', error);
            showError();
            hideLoading();
        }
    }

    // Esta función pinta las tareas en el HTML
    function displayTasks(tasks) {
        // Limpio el contenedor por si había tareas antes
        tasksContainer.innerHTML = '';

        // Si no hay tareas, muestro el mensaje de "no hay resultados"
        if (tasks.length === 0) {
            showNoResults();
            return;
        }

        // Por cada tarea, creo una tarjeta y la añado al contenedor
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';

            // Formateo la fecha para que se vea bien
            const taskDate = task.date ? new Date(task.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'Fecha no disponible';

            // Creo el HTML de la tarjeta de tarea
            taskCard.innerHTML = `
                        <div class="task-title">${task.title || 'Sin título'}</div>
                        <div class="task-description">${task.description || 'Sin descripción'}</div>
                        <div class="task-meta">
                            <div class="task-author">${task.author || 'Anónimo'}</div>
                            <div class="task-date">${taskDate}</div>
                        </div>
                    `;

            // Añado la tarjeta al contenedor
            tasksContainer.appendChild(taskCard);
        });
    }

    // Esta función filtra las tareas cuando el usuario busca
    function filterTasks() {
        // Obtengo lo que el usuario está buscando
        const searchTerm = searchInput.value.toLowerCase();

        // Filtro las tareas que coincidan con la búsqueda
        const filteredTasks = allTasks.filter(task => {
            // Busco en el título, descripción y autor
            const matchesSearch =
                (task.title && task.title.toLowerCase().includes(searchTerm)) ||
                (task.description && task.description.toLowerCase().includes(searchTerm)) ||
                (task.author && task.author.toLowerCase().includes(searchTerm));

            return matchesSearch;
        });

        // Muestro las tareas filtradas
        displayTasks(filteredTasks);
    }

    // Esta función muestra datos de ejemplo si el servidor no funciona
    function showExampleData() {
        // Oculto el error y muestro cargando
        hideError();
        showLoading();

        // Pongo un timeout para simular que está cargando
        setTimeout(() => {
            // Estos son datos de ejemplo
            allTasks = [
                {
                    title: "Tareas en el servidor",
                    description: "Probando de nuevo",
                    author: "Jesús",
                    date: "2018-11-14T10:29:59"
                },
                {
                    title: "Hacer la comida",
                    description: "Miscarrones con queso",
                    author: "",
                    date: "2018-11-14T16:46:27"
                },
                {
                    title: "Echar gasolina",
                    description: "Ir al Carrefour a echar gasolina",
                    author: "",
                    date: "2018-11-14T16:47:04"
                },
                {
                    title: "Dar de comer a la mascota",
                    description: "Pedir pierno para la mascota.",
                    author: "",
                    date: "2018-11-14T16:47:45"
                },
                {
                    title: "Probando con otra tarea más",
                    description: "Muy corta",
                    author: "",
                    date: "2000-11-12T00:00:00"
                },
                {
                    title: "Hacer un bocata",
                    description: "Ya no va entiendo hambre, tengo que hacer un bocata para pasar la media mañana sin que suene la tripa demasiado. Mejor uno vegetal",
                    author: "",
                    date: "2018-11-15T12:34:00"
                }
            ];

            // Muestro los datos de ejemplo
            displayTasks(allTasks);
            hideLoading();
        }, 800);
    }

    // ========== FUNCIONES PARA MOSTRAR/OCULTAR MENSAJES ==========

    // Muestro el mensaje de cargando
    function showLoading() {
        loadingMessage.style.display = 'block';
        tasksContainer.innerHTML = '';
    }

    // Oculto el mensaje de cargando
    function hideLoading() {
        loadingMessage.style.display = 'none';
    }

    // Muestro el mensaje de error
    function showError() {
        errorMessage.style.display = 'block';
    }

    // Oculto el mensaje de error
    function hideError() {
        errorMessage.style.display = 'none';
    }

    // Muestro el mensaje de "no hay resultados"
    function showNoResults() {
        noResultsMessage.style.display = 'block';
    }

    // Oculto el mensaje de "no hay resultados"
    function hideNoResults() {
        noResultsMessage.style.display = 'none';
    }
});