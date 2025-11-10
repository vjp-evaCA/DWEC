// header-component.js - El componente de cabecera que se usa en todas las páginas

// Creo un componente personalizado para la cabecera
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    // Esto se ejecuta cuando el componente se añade al DOM
    connectedCallback() {
        this.render();           // Pinto el HTML
        this.setActiveLink();    // Marco el enlace activo
        this.setupEventListeners(); // Configuro eventos
    }

    // Pinto el HTML de la cabecera
    render() {
        this.innerHTML = `
            <header class="main-header">
                <div class="header-container">
                    <!-- Logo y título -->
                    <div class="header-brand">
                        <div class="header-logo">📋</div>
                        <h1 class="header-title">
                            <a href="index.html">Inicio</a>
                        </h1>
                    </div>

                    <!-- Navegación principal -->
                    <nav class="header-nav">
                        <a href="../ejercicio2/ejercicio2.html" class="nav-btn">
                            👁️ Ver Tareas
                        </a>
                        <a href="../ejercicio3/ejercicio3.html" class="nav-btn">
                            ➕ Crear Tarea
                        </a>
                        <a href="../ejercicio4/ejercicio4.html" class="nav-btn">
                            ⚙️ Modificar Tareas
                        </a>
                        <a href="../ejercicio5/ejercicio5.html" class="nav-btn">
                            🗑️ Eliminar Tareas
                        </a>
                    </nav>
                </div>
            </header>
        `;
    }

    // Configuro los eventos de los botones y enlaces
    setupEventListeners() {
        // Solo añado evento para el logo/título de inicio
        const headerTitle = this.querySelector('.header-title a');
        if (headerTitle) {
            headerTitle.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation('index.html');
            });
        }
    }

    // Marco qué enlace está activo según la página actual
    setActiveLink() {
        const currentPage = this.getCurrentPage();
        const navButtons = this.querySelectorAll('.nav-btn');
        
        // Quito la clase active de todos
        navButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Y se la pongo al que corresponde con la página actual
        navButtons.forEach(button => {
            const buttonHref = button.getAttribute('href');
            if (buttonHref && buttonHref.includes(currentPage)) {
                button.classList.add('active');
            }
        });

        // Marco también el título "Inicio" si estamos en index.html
        if (currentPage === 'index.html') {
            const headerTitle = this.querySelector('.header-title a');
            if (headerTitle) {
                headerTitle.style.fontWeight = 'bold';
                headerTitle.style.color = 'var(--primary-color)';
            }
        }
    }

    // Averiguo en qué página estoy según la URL
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();  // Obtengo el nombre del archivo
        
        return page || 'index.html';
    }

    // Manejo la navegación con efecto suave
    handleNavigation(url) {
        // Usar la navegación global de app.js si está disponible
        if (window.taskManagerApp && window.taskManagerApp.handleNavigation) {
            window.taskManagerApp.handleNavigation(url);
        } else {
            // Fallback: navegación normal
            window.location.href = url;
        }
    }
}

// Registro el componente personalizado para poder usarlo en el HTML
customElements.define('header-component', HeaderComponent);