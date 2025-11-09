// js/header-component.js
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setActiveLink();
    }

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

        // Configurar event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = this.querySelector('#themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme);
        }

        // Navegación suave
        const navLinks = this.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavigation);
        });
    }

    setActiveLink() {
        const currentPage = this.getCurrentPage();
        const navLinks = this.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        
        const pageMap = {
            'index.html': 'home',
            'ver-tareas.html': 'view',
            'crear-tarea.html': 'create',
            'gestion-tareas.html': 'manage'
        };

        return pageMap[page] || 'home';
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Actualizar texto del botón
        const themeToggle = document.querySelector('#themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('span');
            const text = themeToggle.textContent.includes('🌙') ? '☀️' : '🌙';
            icon.textContent = text;
        }
    }

    handleNavigation(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        
        // Transición suave
        document.body.style.opacity = '0.7';
        
        setTimeout(() => {
            window.location.href = href;
        }, 200);
    }
}

// Registrar el componente personalizado
customElements.define('header-component', HeaderComponent);