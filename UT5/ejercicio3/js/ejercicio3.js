document.addEventListener('DOMContentLoaded', function () {
    // Elementos del formulario
    const taskForm = document.getElementById('taskForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const estadoSelect = document.getElementById('estado');
    const prioritySelect = document.getElementById('priority');
    const dueDateInput = document.getElementById('dueDate');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');

    // Elementos de mensajes
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const validationErrors = document.getElementById('validationErrors');
    const errorDetails = document.getElementById('errorDetails');
    const errorsList = document.getElementById('errorsList');

    // Botones de acción
    const cancelBtn = document.getElementById('cancelBtn');
    const viewTasksBtn = document.getElementById('viewTasksBtn');
    const createAnotherBtn = document.getElementById('createAnotherBtn');
    const retryBtn = document.getElementById('retryBtn');

    // Variables para almacenar datos en caso de reintento
    let lastFormData = null;

    // Configurar fecha mínima como hoy
    const today = new Date().toISOString().slice(0, 16);
    dueDateInput.min = today;

    // Event Listeners
    taskForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', handleCancel);
    viewTasksBtn.addEventListener('click', redirectToTasks);
    createAnotherBtn.addEventListener('click', resetForm);
    retryBtn.addEventListener('click', handleRetry);

    // Validación en tiempo real
    titleInput.addEventListener('blur', validateTitle);
    descriptionInput.addEventListener('blur', validateDescription);

    // Función principal para enviar el formulario
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        // Validar formulario
        const isValid = validateForm();
        
        if (!isValid) {
            showValidationErrors();
            return;
        }

        // Ocultar mensajes anteriores
        hideAllMessages();

        // Preparar datos para enviar
        const formData = getFormData();
        lastFormData = formData; // Guardar para posible reintento

        // Mostrar estado de carga
        setLoadingState(true);

        try {
            // Enviar petición POST
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Verificar si la respuesta es correcta (código 200-299)
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Procesar respuesta exitosa
            const result = await response.json();
            showSuccessMessage();
            
            console.log('Tarea creada exitosamente:', result);

        } catch (error) {
            console.error('Error al crear la tarea:', error);
            showErrorMessage(error.message);
        } finally {
            setLoadingState(false);
        }
    }

    // Función para obtener datos del formulario
    function getFormData() {
        return {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            estado: estadoSelect.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value || null,
            createdAt: new Date().toISOString()
        };
    }

    // Función para validar el formulario completo
    function validateForm() {
        let isValid = true;

        // Validar título
        if (!validateTitle()) isValid = false;

        // Validar descripción
        if (!validateDescription()) isValid = false;

        return isValid;
    }

    // Validación individual del título
    function validateTitle() {
        const title = titleInput.value.trim();
        const errorElement = document.getElementById('titleError');

        if (title.length < 3) {
            showFieldError(titleInput, errorElement, 'El título debe tener al menos 3 caracteres');
            return false;
        } else {
            clearFieldError(titleInput, errorElement);
            return true;
        }
    }

    // Validación individual de la descripción
    function validateDescription() {
        const description = descriptionInput.value.trim();
        const errorElement = document.getElementById('descriptionError');

        if (description.length < 10) {
            showFieldError(descriptionInput, errorElement, 'La descripción debe tener al menos 10 caracteres');
            return false;
        } else {
            clearFieldError(descriptionInput, errorElement);
            return true;
        }
    }

    // Mostrar error en campo individual
    function showFieldError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
    }

    // Limpiar error de campo individual
    function clearFieldError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    }

    // Mostrar errores de validación globales
    function showValidationErrors() {
        const errors = [];
        
        if (titleInput.value.trim().length < 3) {
            errors.push('El título debe tener al menos 3 caracteres');
        }
        
        if (descriptionInput.value.trim().length < 10) {
            errors.push('La descripción debe tener al menos 10 caracteres');
        }

        errorsList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
        validationErrors.style.display = 'block';
        
        // Scroll hacia los errores
        validationErrors.scrollIntoView({ behavior: 'smooth' });
    }

    // Mostrar mensaje de éxito
    function showSuccessMessage() {
        taskForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Mostrar mensaje de error
    function showErrorMessage(details) {
        errorDetails.textContent = details;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Ocultar todos los mensajes
    function hideAllMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        validationErrors.style.display = 'none';
    }

    // Manejar estado de carga
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitText.style.display = 'none';
            submitSpinner.style.display = 'inline-block';
            submitBtn.disabled = true;
        } else {
            submitText.style.display = 'inline-block';
            submitSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    // Manejar reintento
    function handleRetry() {
        errorMessage.style.display = 'none';
        if (lastFormData) {
            // Restaurar datos del último intento
            titleInput.value = lastFormData.title;
            descriptionInput.value = lastFormData.description;
            estadoSelect.value = lastFormData.estado;
            prioritySelect.value = lastFormData.priority;
            dueDateInput.value = lastFormData.dueDate;
            
            // Reenviar formulario
            handleFormSubmit(new Event('submit'));
        }
    }

    // Manejar cancelación
    function handleCancel() {
        if (confirm('¿Estás seguro de que quieres cancelar? Se perderán los datos no guardados.')) {
            redirectToTasks();
        }
    }

    // Redirigir a la página de tareas
    function redirectToTasks() {
        window.location.href = 'ejercicio2.html'; // Ajusta la ruta según tu estructura
    }

    // Resetear formulario para crear otra tarea
    function resetForm() {
        taskForm.reset();
        successMessage.style.display = 'none';
        taskForm.style.display = 'block';
        
        // Limpiar errores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Función de utilidad para mostrar notificaciones (opcional)
    function showNotification(message, type = 'info') {
        // Podrías implementar notificaciones toast aquí
        console.log(`${type.toUpperCase()}: ${message}`);
    }
});