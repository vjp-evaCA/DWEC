// ejercicio4.js - Código para gestionar tareas (solo edición)
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

    // Elementos del modal de edición (para modificar tareas)
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

    // Variables para guardar el estado de la aplicación
    let allTasks = []; // Todas las tareas del servidor

    // Cuando se carga la página, cargo las tareas
    loadTasks();

    // Configuro todos los event listeners para que los botones funcionen
    searchInput.addEventListener('input', filterTasks);
    refreshBtn.addEventListener('click', loadTasks);
    
    // REDIRECCIÓN AÑADIDA - Botón "Nueva Tarea"
    newTaskBtn.addEventListener('click', function() {
        window.location.href = '../ejercicio3/ejercicio3.html';
    });
    
    if (showExampleBtn) {
        showExampleBtn.addEventListener('click', showExampleData);
    }
    
    if (createFirstTaskBtn) {
        createFirstTaskBtn.addEventListener('click', function() {
            window.location.href = '../ejercicio3/ejercicio3.html';
        });
    }

    // Event listeners para el modal de edición
    editTaskForm.addEventListener('submit', handleUpdateTask);
    closeEditModal.addEventListener('click', closeEditModalHandler);
    cancelEditBtn.addEventListener('click', closeEditModalHandler);

    // Cerrar modal si haces click fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === editModal) {
            closeEditModalHandler();
        }
    });

    // Esta función trae las tareas del servidor
    async function loadTasks() {
        showLoading();      // Muestro que está cargando
        hideError();        // Oculto errores anteriores
        hideNoResults();    // Oculto "sin resultados"
        hideNoTasks();      // Oculto "sin tareas"

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
                    <button class="action-btn edit-btn" title="Editar tarea" onclick="openEditModal('${task.id}')">
                        ✏️
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

    // Esta función abre el modal para editar una tarea
    window.openEditModal = function (taskId) {
        // Busco la tarea por su ID
        const task = allTasks.find(t => t.id == taskId);
        if (!task) {
            alert('Tarea no encontrada');
            return;
        }

        // Lleno el formulario con los datos de la tarea
        editTaskId.value = task.id;
        editTitle.value = task.title || '';
        editDescription.value = task.description || '';
        editEstado.value = task.estado || 'pendiente';
        editPriority.value = task.priority || 'media';
        
        // Si tiene fecha límite, la formateo para el input
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            editDueDate.value = dueDate.toISOString().slice(0, 16);
        } else {
            editDueDate.value = '';
        }

        // Muestro el modal y pongo el foco en el título
        editModal.style.display = 'block';
        editTitle.focus();
    };

    // Esta función maneja la actualización de una tarea
    async function handleUpdateTask(event) {
        event.preventDefault(); // Evito que el formulario se envíe normal

        // Valido que los campos estén bien
        if (!validateEditForm()) {
            return;
        }

        // Muestro que está cargando
        setUpdateLoadingState(true);

        try {
            const taskId = editTaskId.value;
            // Preparo los datos actualizados
            const updatedTask = {
                title: editTitle.value.trim(),
                description: editDescription.value.trim(),
                estado: editEstado.value,
                priority: editPriority.value,
                dueDate: editDueDate.value || null,
                updatedAt: new Date().toISOString() // Fecha de actualización
            };

            // Envío la petición PUT al servidor
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });

            // Verifico que el servidor responda bien
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            
            // Actualizo la tarea en la lista local
            const taskIndex = allTasks.findIndex(t => t.id == taskId);
            if (taskIndex !== -1) {
                allTasks[taskIndex] = { ...allTasks[taskIndex], ...updatedTask };
                displayTasks(allTasks);
            }

            // Cierro el modal y muestro mensaje de éxito
            closeEditModalHandler();
            showNotification('Tarea actualizada exitosamente', 'success');

        } catch (error) {
            // Si hay error, lo muestro
            console.error('Error al actualizar la tarea:', error);
            showNotification('Error al actualizar la tarea: ' + error.message, 'error');
        } finally {
            // Siempre quito el estado de carga
            setUpdateLoadingState(false);
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

            displayTasks(allTasks);
            hideLoading();
        }, 800);
    }

    // ========== FUNCIONES DE VALIDACIÓN ==========

    // Valido el formulario de edición
    function validateEditForm() {
        let isValid = true;

        // Valido título
        if (editTitle.value.trim().length < 3) {
            showFieldError(editTitle, 'El título debe tener al menos 3 caracteres');
            isValid = false;
        } else {
            clearFieldError(editTitle);
        }

        // Valido descripción
        if (editDescription.value.trim().length < 10) {
            showFieldError(editDescription, 'La descripción debe tener al menos 10 caracteres');
            isValid = false;
        } else {
            clearFieldError(editDescription);
        }

        return isValid;
    }

    // Muestro error en un campo
    function showFieldError(inputElement, message) {
        inputElement.classList.add('error');
        const errorElement = document.getElementById(inputElement.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Limpio error de un campo
    function clearFieldError(inputElement) {
        inputElement.classList.remove('error');
        const errorElement = document.getElementById(inputElement.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
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

    // Para el modal de edición
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

    // ========== FUNCIONES PARA CERRAR MODALES ==========

    function closeEditModalHandler() {
        editModal.style.display = 'none';
        editTaskForm.reset();
    }

    // ========== FUNCIONES DE UTILIDAD ==========

    // Redirige a la página de crear nueva tarea
    function redirectToNewTask() {
        window.location.href = '../ejercicio3/ejercicio3.html';
    }

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