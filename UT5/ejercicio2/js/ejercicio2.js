document.addEventListener('DOMContentLoaded', function () {
    const tasksContainer = document.getElementById('tasksContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const showExampleBtn = document.getElementById('showExampleBtn');

    let allTasks = [];

    // Cargar tareas al iniciar
    loadTasks();

    // Configurar eventos
    searchInput.addEventListener('input', filterTasks);
    refreshBtn.addEventListener('click', loadTasks);
    if (showExampleBtn) {
        showExampleBtn.addEventListener('click', showExampleData);
    }

    // Función para cargar tareas desde la API
    async function loadTasks() {
        showLoading();
        hideError();
        hideNoResults();

        try {
            const response = await fetch('http://localhost:3000/tasks');

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            allTasks = await response.json();
            displayTasks(allTasks);
            hideLoading();
        } catch (error) {
            console.error('Error al cargar las tareas:', error);
            showError();
            hideLoading();
        }
    }

    // Función para mostrar las tareas en tarjetas
    function displayTasks(tasks) {
        tasksContainer.innerHTML = '';

        if (tasks.length === 0) {
            showNoResults();
            return;
        }

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';

            // Formatear fecha
            const taskDate = task.date ? new Date(task.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'Fecha no disponible';

            taskCard.innerHTML = `
                        <div class="task-title">${task.title || 'Sin título'}</div>
                        <div class="task-description">${task.description || 'Sin descripción'}</div>
                        <div class="task-meta">
                            <div class="task-author">${task.author || 'Anónimo'}</div>
                            <div class="task-date">${taskDate}</div>
                        </div>
                    `;

            tasksContainer.appendChild(taskCard);
        });
    }

    // Función para filtrar tareas
    function filterTasks() {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredTasks = allTasks.filter(task => {
            // Filtrar por término de búsqueda
            const matchesSearch =
                (task.title && task.title.toLowerCase().includes(searchTerm)) ||
                (task.description && task.description.toLowerCase().includes(searchTerm)) ||
                (task.author && task.author.toLowerCase().includes(searchTerm));

            return matchesSearch;
        });

        displayTasks(filteredTasks);
    }

    // Función para mostrar datos de ejemplo
    function showExampleData() {
        hideError();
        showLoading();

        // Simular una respuesta del servidor con datos de ejemplo
        setTimeout(() => {
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

            displayTasks(allTasks);
            hideLoading();
        }, 800);
    }

    // Funciones auxiliares para mostrar/ocultar mensajes
    function showLoading() {
        loadingMessage.style.display = 'block';
        tasksContainer.innerHTML = '';
    }

    function hideLoading() {
        loadingMessage.style.display = 'none';
    }

    function showError() {
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showNoResults() {
        noResultsMessage.style.display = 'block';
    }

    function hideNoResults() {
        noResultsMessage.style.display = 'none';
    }
});