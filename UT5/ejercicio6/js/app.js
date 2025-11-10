// app.js - Utilidades globales para toda la aplicación

class TaskManagerApp {
    constructor() {
        this.init();  // Inicializo cuando se crea la clase
    }

    init() {
        this.setupGlobalEvents();  // Configuro eventos globales
        this.setupNavigation();    // Configuro navegación global
    }

    // Configuro eventos que se usan en toda la aplicación
    setupGlobalEvents() {
        // Manejo errores globales de JavaScript
        window.addEventListener('error', this.handleGlobalError);
    }

    // Configuro navegación global
    setupNavigation() {
        // Navegación para enlaces de la cabecera
        document.addEventListener('click', (e) => {
            const navBtn = e.target.closest('.nav-btn');
            if (navBtn && navBtn.hasAttribute('href')) {
                e.preventDefault();
                this.handleNavigation(navBtn.getAttribute('href'));
            }
        });
    }

    // Manejo la navegación con transición
    handleNavigation(url) {
        // Muestro una transición de página si no estamos en la misma página
        if (!window.location.href.includes(url)) {
            this.showPageTransition();
            
            // Después de un momento, navego a la URL
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        }
    }

    // Muestro una transición cuando cambias de página
    showPageTransition() {
        // Solo crear transición si no existe ya
        if (document.getElementById('page-transition')) return;
        
        const transition = document.createElement('div');
        transition.id = 'page-transition';
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        `;
        
        // Añado animación CSS si no existe
        if (!document.querySelector('#page-transition-styles')) {
            const style = document.createElement('style');
            style.id = 'page-transition-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(transition);
    }

    // Manejo errores globales (por si algo sale mal)
    handleGlobalError(error) {
        console.error('Error global:', error);
        TaskManagerApp.showNotification('Ha ocurrido un error inesperado', 'error');
    }

    // ========== FUNCIONES ESTÁTICAS (se pueden usar sin crear la clase) ==========

    // Muestro notificaciones toast en la pantalla
    static showNotification(message, type = 'info') {
        // Creo el elemento de notificación
        const notification = document.createElement('div');
        notification.className = `global-notification ${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            background-color: ${type === 'success' ? '#28a745' : 
                             type === 'error' ? '#dc3545' : 
                             type === 'warning' ? '#ffc107' : '#4a6fa5'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        // Añado animaciones si no existen
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
        }

        // Lo añado al body
        document.body.appendChild(notification);
        
        // Lo quito después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Formateo fechas para mostrarlas bonitas
    static formatDate(dateString) {
        if (!dateString) return 'Sin fecha';
        
        try {
            return new Date(dateString).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formateando fecha:', error);
            return 'Fecha inválida';
        }
    }

    // Valida si un string es un JSON válido
    static isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Guarda datos en localStorage con manejo de errores
    static saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            this.showNotification('Error al guardar los datos', 'error');
            return false;
        }
    }

    // Lee datos de localStorage con manejo de errores
    static loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return null;
        }
    }
}

// Inicializo la aplicación cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    window.taskManagerApp = new TaskManagerApp();
});