document.addEventListener('DOMContentLoaded', function () {
    // Elementos principales
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

    // Elementos del modal de edición
    const editModal = document.getElementById('editModal');
    const editTaskForm = document.getElementById('editTaskForm');
    const editTaskId = document.getElementById('editTaskId');
    const editTitle = document.getElementById('editTitle');
    const editDescription = document.getElementById('editDescription');
    const editEstado = document.getElementById('editEstado');
    const editPriority = document.getElementById('editPriority');
    const editDueDate = document.getElementById('editDueDate');
    const updateTaskBtn = document.getElementById('updateTaskBtn');
    const updateText = document.getElementById('updateText');
    const updateSpinner = document.getElementById('updateSpinner');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');

    // Elementos del modal de eliminación
    const deleteModal = document.getElementById('deleteModal');
    const deleteTaskTitle = document.getElementById('deleteTaskTitle');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteText = document.getElementById('deleteText');
    const deleteSpinner = document.getElementById('deleteSpinner');
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    // Variables de estado
    let allTasks = [];
    let isDeleteMode = false;
    let taskToDelete = null;

    // Inicializar la aplicación
    loadTasks();

    // Event Listeners
    searchInput.addEventListener('input', filterTasks);
    refreshBtn.addEventListener('click', loadTasks);
    newTaskBtn.addEventListener('click', redirectToNewTask);
    toggleDeleteBtn.addEventListener('click', toggleDeleteMode);
    
    if (showExampleBtn) {
        showExampleBtn.addEventListener('click', showExampleData);
    }
    
    if (createFirstTaskBtn) {
        createFirstTaskBtn.addEventListener('click', redirectToNewTask);
    }

    // Event Listeners para modales de edición
    editTaskForm.addEventListener('submit', handleUpdateTask);
    closeEditModal.addEventListener('click', closeEditModalHandler);
    cancelEditBtn.addEventListener('click', closeEditModalHandler);

    // Event Listeners para modales de eliminación
    confirmDeleteBtn.addEventListener('click', handleDeleteTask);
    closeDeleteModal.addEventListener('click', closeDeleteModalHandler);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalHandler);

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            closeEditModalHandler();
        }
        if (event.target === deleteModal) {
            closeDeleteModalHandler();
        }
    });

    // Función para cargar tareas desde la API
    async function loadTasks() {
        showLoading();
        hideError();
        hideNoResults();
        hideNoTasks();

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
            if (allTasks.length === 0) {
                showNoTasks();
            } else {
                showNoResults();
            }
            return;
        }

        tasks.forEach(task => {
            const taskCard = createTaskCard(task);
            tasksContainer.appendChild(taskCard);
        });
    }

    // Función para crear una tarjeta de tarea
    function createTaskCard(task) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.estado || 'pendiente'} ${task.priority || 'media'}`;
        taskCard.dataset.taskId = task.id;

        // Formatear fechas
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

        taskCard.innerHTML = `
            <div class="task-header">
                <div class="task-title">${escapeHtml(task.title || 'Sin título')}</div>
                <div class="task-actions">
                    <button class="action-btn edit-btn" title="Editar tarea" onclick="openEditModal('${task.id}')">
                        ✏️
                    </button>
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

    // Función para abrir modal de edición
    window.openEditModal = function (taskId) {
        const task = allTasks.find(t => t.id == taskId);
        if (!task) {
            alert('Tarea no encontrada');
            return;
        }

        // Llenar el formulario con los datos de la tarea
        editTaskId.value = task.id;
        editTitle.value = task.title || '';
        editDescription.value = task.description || '';
        editEstado.value = task.estado || 'pendiente';
        editPriority.value = task.priority || 'media';
        
        if (task.dueDate) {
            // Formatear la fecha para el input datetime-local
            const dueDate = new Date(task.dueDate);
            editDueDate.value = dueDate.toISOString().slice(0, 16);
        } else {
            editDueDate.value = '';
        }

        // Mostrar el modal
        editModal.style.display = 'block';
        editTitle.focus();
    };

    // Función para manejar la actualización de tarea
    async function handleUpdateTask(event) {
        event.preventDefault();

        // Validar formulario
        if (!validateEditForm()) {
            return;
        }

        setUpdateLoadingState(true);

        try {
            const taskId = editTaskId.value;
            const updatedTask = {
                title: editTitle.value.trim(),
                description: editDescription.value.trim(),
                estado: editEstado.value,
                priority: editPriority.value,
                dueDate: editDueDate.value || null,
                updatedAt: new Date().toISOString()
            };

            // Enviar petición PUT
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            
            // Actualizar la tarea en la lista local
            const taskIndex = allTasks.findIndex(t => t.id == taskId);
            if (taskIndex !== -1) {
                allTasks[taskIndex] = { ...allTasks[taskIndex], ...updatedTask };
                displayTasks(allTasks);
            }

            // Cerrar modal y mostrar mensaje de éxito
            closeEditModalHandler();
            showNotification('Tarea actualizada exitosamente', 'success');

        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            showNotification('Error al actualizar la tarea: ' + error.message, 'error');
        } finally {
            setUpdateLoadingState(false);
        }
    }

    // Función para abrir modal de eliminación
    window.openDeleteModal = function (taskId) {
        const task = allTasks.find(t => t.id == taskId);
        if (!task) {
            alert('Tarea no encontrada');
            return;
        }

        taskToDelete = task;
        deleteTaskTitle.textContent = `"${task.title}"`;
        deleteModal.style.display = 'block';
    };

    // Función para manejar la eliminación de tarea
    async function handleDeleteTask() {
        if (!taskToDelete) return;

        setDeleteLoadingState(true);

        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskToDelete.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Eliminar la tarea de la lista local
            allTasks = allTasks.filter(t => t.id !== taskToDelete.id);
            displayTasks(allTasks);

            // Cerrar modal y mostrar mensaje de éxito
            closeDeleteModalHandler();
            showNotification('Tarea eliminada exitosamente', 'success');

        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            showNotification('Error al eliminar la tarea: ' + error.message, 'error');
        } finally {
            setDeleteLoadingState(false);
            taskToDelete = null;
        }
    }

    // Función para alternar modo eliminación
    function toggleDeleteMode() {
        isDeleteMode = !isDeleteMode;
        
        if (isDeleteMode) {
            toggleDeleteBtn.innerHTML = '<span>❌</span> Salir del Modo Eliminar';
            toggleDeleteBtn.classList.add('btn-warning');
            document.body.classList.add('delete-mode');
            showNotification('Modo eliminación activado. Haz clic en el icono 🗑️ para eliminar tareas.', 'warning');
        } else {
            toggleDeleteBtn.innerHTML = '<span>🗑️</span> Modo Eliminar';
            toggleDeleteBtn.classList.remove('btn-warning');
            document.body.classList.remove('delete-mode');
        }
    }

    // Función para filtrar tareas
    function filterTasks() {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredTasks = allTasks.filter(task => {
            const matchesSearch =
                (task.title && task.title.toLowerCase().includes(searchTerm)) ||
                (task.description && task.description.toLowerCase().includes(searchTerm)) ||
                (task.estado && task.estado.toLowerCase().includes(searchTerm)) ||
                (task.priority && task.priority.toLowerCase().includes(searchTerm));

            return matchesSearch;
        });

        displayTasks(filteredTasks);
    }

    // Función para mostrar datos de ejemplo
    function showExampleData() {
        hideError();
        showLoading();

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

            displayTasks(allTasks);
            hideLoading();
        }, 800);
    }

    // Funciones de validación
    function validateEditForm() {
        let isValid = true;

        // Validar título
        if (editTitle.value.trim().length < 3) {
            showFieldError(editTitle, 'El título debe tener al menos 3 caracteres');
            isValid = false;
        } else {
            clearFieldError(editTitle);
        }

        // Validar descripción
        if (editDescription.value.trim().length < 10) {
            showFieldError(editDescription, 'La descripción debe tener al menos 10 caracteres');
            isValid = false;
        } else {
            clearFieldError(editDescription);
        }

        return isValid;
    }

    function showFieldError(inputElement, message) {
        inputElement.classList.add('error');
        const errorElement = document.getElementById(inputElement.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearFieldError(inputElement) {
        inputElement.classList.remove('error');
        const errorElement = document.getElementById(inputElement.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Funciones auxiliares para mostrar/ocultar estados
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

    // Funciones para manejar estados de carga
    function setUpdateLoadingState(isLoading) {
        if (isLoading) {
            updateText.style.display = 'none';
            updateSpinner.style.display = 'inline-block';
            updateTaskBtn.disabled = true;
        } else {
            updateText.style.display = 'inline-block';
            updateSpinner.style.display = 'none';
            updateTaskBtn.disabled = false;
        }
    }

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

    // Funciones para cerrar modales
    function closeEditModalHandler() {
        editModal.style.display = 'none';
        editTaskForm.reset();
    }

    function closeDeleteModalHandler() {
        deleteModal.style.display = 'none';
        taskToDelete = null;
    }

    // Funciones de utilidad
    function redirectToNewTask() {
        window.location.href = 'formulario-tarea.html';
    }

    function getEstadoText(estado) {
        const estados = {
            'pendiente': 'Pendiente',
            'haciendo': 'En Progreso',
            'completada': 'Completada'
        };
        return estados[estado] || estado;
    }

    function getPriorityText(priority) {
        const priorities = {
            'baja': 'Baja',
            'media': 'Media',
            'alta': 'Alta'
        };
        return priorities[priority] || priority;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showNotification(message, type = 'info') {
        // Crear notificación toast
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

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Añadir estilos para las animaciones de notificación
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