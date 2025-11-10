// ejercicio3.js - Este es el código para crear nuevas tareas
document.addEventListener('DOMContentLoaded', function () {
    // Estos son todos los elementos del formulario que voy a usar
    const taskForm = document.getElementById('taskForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const estadoSelect = document.getElementById('estado');
    const prioritySelect = document.getElementById('priority');
    const dueDateInput = document.getElementById('dueDate');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');

    // Elementos para mostrar mensajes al usuario
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

    // Guardo los datos del formulario por si hay que reintentar
    let lastFormData = null;

    // Pongo que la fecha mínima sea hoy, no se pueden crear tareas para el pasado
    const today = new Date().toISOString().slice(0, 16);
    dueDateInput.min = today;

    // Configuro todos los event listeners para que los botones funcionen
    taskForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', handleCancel);
    viewTasksBtn.addEventListener('click', redirectToTasks);
    createAnotherBtn.addEventListener('click', resetForm);
    retryBtn.addEventListener('click', handleRetry);

    // Validación en tiempo real cuando el usuario sale de los campos
    titleInput.addEventListener('blur', validateTitle);
    descriptionInput.addEventListener('blur', validateDescription);

    // Esta función se ejecuta cuando el usuario envía el formulario
    async function handleFormSubmit(event) {
        event.preventDefault(); // Evito que el formulario se envíe de la forma normal
        
        // Primero valido que todo esté bien
        const isValid = validateForm();
        
        if (!isValid) {
            showValidationErrors(); // Si hay errores, los muestro
            return;
        }

        // Oculto cualquier mensaje anterior
        hideAllMessages();

        // Preparo los datos para enviar al servidor
        const formData = getFormData();
        lastFormData = formData; // Guardo por si hay que reintentar

        // Muestro que está cargando
        setLoadingState(true);

        try {
            // Envío la tarea nueva al servidor con POST
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Verifico que el servidor responda bien
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Si todo sale bien, proceso la respuesta
            const result = await response.json();
            showSuccessMessage(); // Muestro mensaje de éxito
            
            console.log('Tarea creada exitosamente:', result);

        } catch (error) {
            // Si hay error, lo muestro
            console.error('Error al crear la tarea:', error);
            showErrorMessage(error.message);
        } finally {
            // Siempre quito el estado de carga
            setLoadingState(false);
        }
    }

    // Esta función junta todos los datos del formulario
    function getFormData() {
        return {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            estado: estadoSelect.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value || null,
            createdAt: new Date().toISOString() // Pongo la fecha actual
        };
    }

    // Valido todo el formulario
    function validateForm() {
        let isValid = true;

        // Valido título y descripción
        if (!validateTitle()) isValid = false;
        if (!validateDescription()) isValid = false;

        return isValid;
    }

    // Valido que el título tenga al menos 3 caracteres
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

    // Valido que la descripción tenga al menos 10 caracteres
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

    // Muestro error en un campo individual
    function showFieldError(inputElement, errorElement, message) {
        inputElement.classList.add('error'); // Pongo borde rojo
        errorElement.textContent = message; // Muestro el mensaje de error
    }

    // Limpio el error de un campo
    function clearFieldError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    }

    // Muestro todos los errores de validación juntos
    function showValidationErrors() {
        const errors = [];
        
        // Recojo todos los errores
        if (titleInput.value.trim().length < 3) {
            errors.push('El título debe tener al menos 3 caracteres');
        }
        
        if (descriptionInput.value.trim().length < 10) {
            errors.push('La descripción debe tener al menos 10 caracteres');
        }

        // Los muestro en una lista
        errorsList.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
        validationErrors.style.display = 'block';
        
        // Hago scroll para que el usuario vea los errores
        validationErrors.scrollIntoView({ behavior: 'smooth' });
    }

    // Muestro mensaje de éxito cuando se crea la tarea
    function showSuccessMessage() {
        taskForm.style.display = 'none'; // Oculto el formulario
        successMessage.style.display = 'block'; // Muestro el mensaje de éxito
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Muestro mensaje de error cuando algo sale mal
    function showErrorMessage(details) {
        errorDetails.textContent = details;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Oculto todos los mensajes
    function hideAllMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        validationErrors.style.display = 'none';
    }

    // Manejo el estado de carga (spinner y botón deshabilitado)
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

    // Reintento enviar el formulario si hubo error
    function handleRetry() {
        errorMessage.style.display = 'none';
        if (lastFormData) {
            // Vuelvo a poner los datos que había intentado enviar
            titleInput.value = lastFormData.title;
            descriptionInput.value = lastFormData.description;
            estadoSelect.value = lastFormData.estado;
            prioritySelect.value = lastFormData.priority;
            dueDateInput.value = lastFormData.dueDate;
            
            // Vuelvo a enviar
            handleFormSubmit(new Event('submit'));
        }
    }

    // Manejo la cancelación del formulario
    function handleCancel() {
        if (confirm('¿Estás seguro de que quieres cancelar? Se perderán los datos no guardados.')) {
            redirectToTasks();
        }
    }

    // Redirijo a la página de ver tareas
    function redirectToTasks() {
        window.location.href = 'ejercicio2.html';
    }

    // Reseteo el formulario para crear otra tarea
    function resetForm() {
        taskForm.reset(); // Limpio todos los campos
        successMessage.style.display = 'none';
        taskForm.style.display = 'block'; // Muestro el formulario otra vez
        
        // Limpio todos los errores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Vuelvo al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Función para mostrar notificaciones (de momento solo en consola)
    function showNotification(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
});