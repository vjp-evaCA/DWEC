// js/app.js
class TaskManagerApp {
    constructor() {
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupGlobalEvents();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    }

    setupGlobalEvents() {
        // Navegación global
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-navigation]')) {
                e.preventDefault();
                this.handleNavigation(e.target.getAttribute('href'));
            }
        });

        // Gestión de errores global
        window.addEventListener('error', this.handleGlobalError);
    }

    handleNavigation(url) {
        // Mostrar loader de transición
        this.showPageTransition();
        
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    showPageTransition() {
        const transition = document.createElement('div');
        transition.id = 'page-transition';
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            z-index: 9999;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        `;
        
        document.body.appendChild(transition);
    }

    handleGlobalError(error) {
        console.error('Error global:', error);
        // Podrías mostrar una notificación al usuario
    }

    // Utilidades globales
    static showNotification(message, type = 'info') {
        // Implementación de notificaciones toast
        const notification = document.createElement('div');
        notification.className = `global-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    static formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    new TaskManagerApp();
});