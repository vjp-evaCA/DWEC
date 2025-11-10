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
    }

    // Pinto el HTML de la cabecera
    render() {
        this.innerHTML = `
            <header class="main-header">
                <div class="header-content">
                    <div class="logo">
                        <h1>📝 Gestor de Tareas</h1>
                    </div>
                    <nav class="navigation">
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link" data-page="home">
                                    <span>🏠</span> Inicio
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="ver-tareas.html" class="nav-link" data-page="view">
                                    <span>👁️</span> Ver Tareas
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="crear-tarea.html" class="nav-link" data-page="create">
                                    <span>➕</span> Crear Tarea
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="gestion-tareas.html" class="nav-link" data-page="manage">
                                    <span>⚙️</span> Gestionar Tareas
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div class="header-actions">
                        <button id="themeToggle" class="btn btn-secondary">
                            <span>🌙</span> Tema
                        </button>
                    </div>
                </div>
            </header>
        `;

        // Configuro los event listeners para que todo funcione
        this.setupEventListeners();
    }

    // Configuro los eventos de los botones y enlaces
    setupEventListeners() {
        const themeToggle = this.querySelector('#themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme);
        }

        // Navegación suave para todos los enlaces
        const navLinks = this.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavigation);
        });
    }

    // Marco qué enlace está activo según la página actual
    setActiveLink() {
        const currentPage = this.getCurrentPage();
        const navLinks = this.querySelectorAll('.nav-link');
        
        // Quito la clase active de todos
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Y se la pongo al que corresponde con la página actual
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Averiguo en qué página estoy según la URL
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();  // Obtengo el nombre del archivo
        
        // Mapeo nombres de archivo a códigos de página
        const pageMap = {
            'index.html': 'home',
            'ver-tareas.html': 'view',
            'crear-tarea.html': 'create',
            'gestion-tareas.html': 'manage'
        };

        return pageMap[page] || 'home';  // Si no está, devuelvo 'home'
    }

    // Cambio entre tema claro y oscuro
    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Aplico el nuevo tema
        body.setAttribute('data-theme', newTheme);
        // Guardo la preferencia en localStorage
        localStorage.setItem('theme', newTheme);

        // Actualizo el icono del botón
        const themeToggle = document.querySelector('#themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('span');
            // Cambio entre luna y sol
            const text = themeToggle.textContent.includes('🌙') ? '☀️' : '🌙';
            icon.textContent = text;
        }
    }

    // Manejo la navegación con efecto suave
    handleNavigation(event) {
        event.preventDefault();  // Evito la navegación normal
        const href = event.currentTarget.getAttribute('href');
        
        // Efecto de transición: la página se vuelve semi-transparente
        document.body.style.opacity = '0.7';
        
        // Después de un momento, navego
        setTimeout(() => {
            window.location.href = href;
        }, 200);
    }
}

// Registro el componente personalizado para poder usarlo en el HTML
customElements.define('header-component', HeaderComponent);