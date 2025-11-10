// app.js - Utilidades globales para toda la aplicación

class TaskManagerApp {
    constructor() {
        this.init();  // Inicializo cuando se crea la clase
    }

    init() {
        this.loadTheme();          // Cargo el tema guardado
        this.setupGlobalEvents();  // Configuro eventos globales
    }

    // Cargo el tema desde localStorage o uso 'light' por defecto
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    }

    // Configuro eventos que se usan en toda la aplicación
    setupGlobalEvents() {
        // Navegación global para enlaces con data-navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-navigation]')) {
                e.preventDefault();  // Evito que navegue normal
                this.handleNavigation(e.target.getAttribute('href'));
            }
        });

        // Manejo errores globales de JavaScript
        window.addEventListener('error', this.handleGlobalError);
    }

    // Manejo la navegación con transición
    handleNavigation(url) {
        // Muestro una transición de página
        this.showPageTransition();
        
        // Después de un momento, navego a la URL
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    // Muestro una transición cuando cambias de página
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

    // Manejo errores globales (por si algo sale mal)
    handleGlobalError(error) {
        console.error('Error global:', error);
        // Aquí podrías mostrar una notificación al usuario
    }

    // ========== FUNCIONES ESTÁTICAS (se pueden usar sin crear la clase) ==========

    // Muestro notificaciones toast en la pantalla
    static showNotification(message, type = 'info') {
        // Creo el elemento de notificación
        const notification = document.createElement('div');
        notification.className = `global-notification ${type}`;
        notification.textContent = message;
        
        // Lo añado al body
        document.body.appendChild(notification);
        
        // Lo quito después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Formateo fechas para mostrarlas bonitas
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

// Inicializo la aplicación cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    new TaskManagerApp();
});