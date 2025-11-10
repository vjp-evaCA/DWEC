// eliminar-tareas.js - Código específico para la eliminación de tareas
document.addEventListener('DOMContentLoaded', function () {
    // Estos son todos los elementos del HTML que voy a usar
    const tasksContainer = document.getElementById('tasksContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const noTasksMessage = document.getElementById('noTasksMessage');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const showExampleBtn = document.getElementById('showExampleBtn');
    const createFirstTaskBtn = document.getElementById('createFirstTaskBtn');
    const newTaskBtn = document.getElementById('newTaskBtn');
    const toggleDeleteBtn = document.getElementById('toggleDeleteBtn');

    // Elementos del modal de eliminación (para borrar tareas)
    const deleteModal = document.getElementById('deleteModal');
    const deleteTaskTitle = document.getElementById('deleteTaskTitle');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteText = document.getElementById('deleteText');
    const deleteSpinner = document.getElementById('deleteSpinner');
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    // Variables para guardar el estado de la aplicación
    let allTasks = [];          // Todas las tareas del servidor
    let isDeleteMode = false;   // Si estamos en modo eliminar
    let taskToDelete = null;    // La tarea que queremos eliminar
    let isUsingExampleData = false; // Nueva variable para saber si estamos usando datos de ejemplo

    // Cuando se carga la página, cargo las tareas
    loadTasks();

    // Configuro todos los event listeners para que los botones funcionen
    searchInput.addEventListener('input', filterTasks);
    refreshBtn.addEventListener('click', loadTasks);
    
    // Configurar el botón "Nueva Tarea" para redirigir a ejercicio3.html
    if (newTaskBtn) {
        newTaskBtn.addEventListener('click', function () {
            window.location.href = '../ejercicio3/ejercicio3.html';
        });
    }
    
    toggleDeleteBtn.addEventListener('click', toggleDeleteMode);

    if (showExampleBtn) {
        showExampleBtn.addEventListener('click', showExampleData);
    }

    // Configurar también el botón "Crear Primera Tarea" si existe
    if (createFirstTaskBtn) {
        createFirstTaskBtn.addEventListener('click', function () {
            window.location.href = '../ejercicio3/ejercicio3.html';
        });
    }

    // Event listeners para el modal de eliminación
    confirmDeleteBtn.addEventListener('click', handleDeleteTask);
    closeDeleteModal.addEventListener('click', closeDeleteModalHandler);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalHandler);

    // Cerrar modal si haces click fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === deleteModal) {
            closeDeleteModalHandler();
        }
    });

    // Esta función trae las tareas del servidor
    async function loadTasks() {
        showLoading();      // Muestro que está cargando
        hideError();        // Oculto errores anteriores
        hideNoResults();    // Oculto "sin resultados"
        hideNoTasks();      // Oculto "sin tareas"
        isUsingExampleData = false; // Reseteamos esta variable

        try {
            // Hago la petición al servidor
            const response = await fetch('http://localhost:3000/tasks');

            // Si el servidor responde con error, lanzo una excepción
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
            // Si hay error, lo muestro
            console.error('Error al cargar las tareas:', error);
            showError();
            hideLoading();
        }
    }

    // Esta función pinta las tareas en el HTML
    function displayTasks(tasks) {
        tasksContainer.innerHTML = ''; // Limpio el contenedor

        // Si no hay tareas, muestro el mensaje correspondiente
        if (tasks.length === 0) {
            if (allTasks.length === 0) {
                showNoTasks(); // No hay tareas en absoluto
            } else {
                showNoResults(); // Hay tareas pero no coinciden con la búsqueda
            }
            return;
        }

        // Por cada tarea, creo una tarjeta y la añado
        tasks.forEach(task => {
            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);
        });
    }

    // Creo una tarjeta individual para cada tarea
    function createTaskCard(task) {
        const taskCard = document.createElement('div');
        // Le pongo clases según el estado y prioridad para los colores
        taskCard.className = `task-card ${task.estado || 'pendiente'} ${task.priority || 'media'}`;
        taskCard.dataset.taskId = task.id; // Guardo el ID para luego

        // Formateo las fechas para que se vean bien
        const createdDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : 'Fecha no disponible';

        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : 'Sin fecha límite';

        // Creo el HTML de la tarjeta
        taskCard.innerHTML = `
            <div class="task-header">
                <div class="task-title">${escapeHtml(task.title || 'Sin título')}</div>
                <div class="task-actions">
                    <button class="action-btn delete-btn" title="Eliminar tarea" onclick="openDeleteModal('${task.id}')">
                        🗑️
                    </button>
                </div>
            </div>
            <div class="task-description">${escapeHtml(task.description || 'Sin descripción')}</div>
            <div class="task-meta">
                <span class="task-status status-${task.estado || 'pendiente'}">
                    ${getEstadoText(task.estado)}
                </span>
                <span class="task-priority priority-${task.priority || 'media'}">
                    ${getPriorityText(task.priority)}
                </span>
                ${task.dueDate ? `<span class="task-due">⏰ ${dueDate}</span>` : ''}
                <span class="task-date">Creado: ${createdDate}</span>
            </div>
        `;

        return taskCard;
    }

    // Esta función abre el modal para eliminar una tarea
    window.openDeleteModal = function (taskId) {
        // Busco la tarea por su ID
        const task = allTasks.find(t => t.id == taskId);
        if (!task) {
            alert('Tarea no encontrada');
            return;
        }

        // Guardo la tarea a eliminar y muestro su título en el modal
        taskToDelete = task;
        deleteTaskTitle.textContent = `"${task.title}"`;
        deleteModal.style.display = 'block';
    };

    // Esta función maneja la eliminación de una tarea
    async function handleDeleteTask() {
        if (!taskToDelete) return; // Por si acaso

        // Muestro que está cargando
        setDeleteLoadingState(true);

        try {
            // Si estamos usando datos de ejemplo, eliminamos localmente sin hacer petición al servidor
            if (isUsingExampleData) {
                // Simulamos un delay para que se vea el spinner
                await new Promise(resolve => setTimeout(resolve, 500));

                // Elimino la tarea de la lista local
                allTasks = allTasks.filter(t => t.id !== taskToDelete.id);
                displayTasks(allTasks);

                // Cierro el modal y muestro mensaje de éxito
                closeDeleteModalHandler();
                showNotification('Tarea eliminada exitosamente', 'success');
            } else {
                // Envío la petición DELETE al servidor para tareas reales
                const response = await fetch(`http://localhost:3000/tasks/${taskToDelete.id}`, {
                    method: 'DELETE'
                });

                // Verifico que el servidor responda bien
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                // Elimino la tarea de la lista local
                allTasks = allTasks.filter(t => t.id !== taskToDelete.id);
                displayTasks(allTasks);

                // Cierro el modal y muestro mensaje de éxito
                closeDeleteModalHandler();
                showNotification('Tarea eliminada exitosamente', 'success');
            }

        } catch (error) {
            // Si hay error, lo muestro
            console.error('Error al eliminar la tarea:', error);
            showNotification('Error al eliminar la tarea: ' + error.message, 'error');
        } finally {
            // Siempre quito el estado de carga
            setDeleteLoadingState(false);
            taskToDelete = null;
        }
    }

    // Esta función activa/desactiva el modo eliminar
    function toggleDeleteMode() {
        isDeleteMode = !isDeleteMode;

        if (isDeleteMode) {
            // Modo eliminar activado
            toggleDeleteBtn.innerHTML = '<span>❌</span> Salir del Modo Eliminar';
            toggleDeleteBtn.classList.add('btn-warning');
            document.body.classList.add('delete-mode');
            showNotification('Modo eliminación activado. Haz clic en el icono 🗑️ para eliminar tareas.', 'warning');
        } else {
            // Modo eliminar desactivado
            toggleDeleteBtn.innerHTML = '<span>🗑️</span> Modo Eliminar';
            toggleDeleteBtn.classList.remove('btn-warning');
            document.body.classList.remove('delete-mode');
        }
    }

    // Esta función filtra las tareas cuando el usuario busca
    function filterTasks() {
        const searchTerm = searchInput.value.toLowerCase();

        // Filtro las tareas que coincidan con la búsqueda
        const filteredTasks = allTasks.filter(task => {
            const matchesSearch =
                (task.title && task.title.toLowerCase().includes(searchTerm)) ||
                (task.description && task.description.toLowerCase().includes(searchTerm)) ||
                (task.estado && task.estado.toLowerCase().includes(searchTerm)) ||
                (task.priority && task.priority.toLowerCase().includes(searchTerm));

            return matchesSearch;
        });

        // Muestro las tareas filtradas
        displayTasks(filteredTasks);
    }

    // Esta función muestra datos de ejemplo si el servidor no funciona
    function showExampleData() {
        hideError();
        showLoading();

        // Pongo un timeout para simular carga
        setTimeout(() => {
            allTasks = [
                {
                    id: '1',
                    title: "Terminar los apuntes de la UTS",
                    description: "Preparar los gifs para que se vean en ejecución el ejercicio 2 y el ejercicio 3. También prepararemos NPM para la siguiente semana.",
                    estado: "pendiente",
                    priority: "alta",
                    dueDate: "2024-01-20T23:59:00",
                    createdAt: "2024-01-15T13:03:00"
                },
                {
                    id: '2',
                    title: "Hacer un bocata",
                    description: "Ya me va entrando hambre, tengo que hacer un bocata para pasar la media mañana sin que suene la tripa demasiado. Mejor uno vegetal",
                    estado: "haciendo",
                    priority: "media",
                    dueDate: "2024-01-15T14:00:00",
                    createdAt: "2024-01-15T12:34:00"
                }
            ];

            isUsingExampleData = true; // Marcamos que estamos usando datos de ejemplo
            displayTasks(allTasks);
            hideLoading();
        }, 800);
    }

    // ========== FUNCIONES PARA MOSTRAR/OCULTAR ESTADOS ==========

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

    function showNoTasks() {
        noTasksMessage.style.display = 'block';
    }

    function hideNoTasks() {
        noTasksMessage.style.display = 'none';
    }

    // ========== FUNCIONES PARA ESTADOS DE CARGA ==========

    // Para el modal de eliminación
    function setDeleteLoadingState(isLoading) {
        if (isLoading) {
            deleteText.style.display = 'none';
            deleteSpinner.style.display = 'inline-block';
            confirmDeleteBtn.disabled = true;
        } else {
            deleteText.style.display = 'inline-block';
            deleteSpinner.style.display = 'none';
            confirmDeleteBtn.disabled = false;
        }
    }

    // ========== FUNCIONES PARA CERRAR MODALES ==========

    function closeDeleteModalHandler() {
        deleteModal.style.display = 'none';
        taskToDelete = null;
    }

    // ========== FUNCIONES DE UTILIDAD ==========

    // Convierte el código de estado a texto legible
    function getEstadoText(estado) {
        const estados = {
            'pendiente': 'Pendiente',
            'haciendo': 'En Progreso',
            'completada': 'Completada'
        };
        return estados[estado] || estado;
    }

    // Convierte el código de prioridad a texto legible
    function getPriorityText(priority) {
        const priorities = {
            'baja': 'Baja',
            'media': 'Media',
            'alta': 'Alta'
        };
        return priorities[priority] || priority;
    }

    // Por seguridad, evita que se inyecte código malicioso
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Muestra notificaciones toast al usuario
    function showNotification(message, type = 'info') {
        // Creo el elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            background-color: ${type === 'success' ? 'var(--success-color)' :
                type === 'error' ? 'var(--danger-color)' :
                    type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'};
        `;

        // Añado la notificación al body
        document.body.appendChild(notification);

        // La quito después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Añado los estilos para las animaciones de las notificaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});