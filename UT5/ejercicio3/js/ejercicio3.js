document.addEventListener('DOMContentLoaded', function () {
            const taskForm = document.getElementById('taskForm');
            const submitBtn = document.getElementById('submitBtn');
            const loadingMessage = document.getElementById('loadingMessage');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            const titleError = document.getElementById('titleError');
            const descriptionError = document.getElementById('descriptionError');

            // Configurar fecha mínima como hoy
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').min = today;

            // Validación en tiempo real
            document.getElementById('title').addEventListener('input', validateForm);
            document.getElementById('description').addEventListener('input', validateForm);

            // Envío del formulario
            taskForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                
                if (validateForm()) {
                    await createTask();
                }
            });

            // Función para validar el formulario
            function validateForm() {
                const title = document.getElementById('title').value.trim();
                const description = document.getElementById('description').value.trim();
                let isValid = true;

                // Validar título
                if (title === '') {
                    titleError.style.display = 'block';
                    isValid = false;
                } else {
                    titleError.style.display = 'none';
                }

                // Validar descripción
                if (description === '') {
                    descriptionError.style.display = 'block';
                    isValid = false;
                } else {
                    descriptionError.style.display = 'none';
                }

                // Habilitar/deshabilitar botón
                submitBtn.disabled = !isValid;
                
                return isValid;
            }

            // Función para crear la tarea
            async function createTask() {
                showLoading();
                hideMessages();

                try {
                    // Recoger datos del formulario
                    const formData = {
                        title: document.getElementById('title').value.trim(),
                        description: document.getElementById('description').value.trim(),
                        author: document.getElementById('author').value.trim() || 'Anónimo',
                        status: document.getElementById('status').value,
                        date: document.getElementById('date').value || new Date().toISOString()
                    };

                    // Realizar petición POST
                    const response = await fetch('http://localhost:3000/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    // Verificar si la respuesta es correcta (código 200)
                    if (response.ok) {
                        showSuccess();
                        
                        // Redirigir después de 2 segundos
                        setTimeout(() => {
                            window.location.href = 'ejercicio2.html';
                        }, 2000);
                    } else {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                } catch (error) {
                    console.error('Error al crear la tarea:', error);
                    showError('No se pudo crear la tarea. Verifica que el servidor esté ejecutándose.');
                } finally {
                    hideLoading();
                }
            }

            // Funciones auxiliares para mostrar/ocultar mensajes
            function showLoading() {
                loadingMessage.style.display = 'block';
                submitBtn.disabled = true;
            }

            function hideLoading() {
                loadingMessage.style.display = 'none';
            }

            function showSuccess() {
                successMessage.style.display = 'block';
                taskForm.reset();
            }

            function showError(message) {
                errorText.textContent = message;
                errorMessage.style.display = 'block';
                submitBtn.disabled = false;
            }

            function hideMessages() {
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
            }

            // Validación inicial
            validateForm();
        });