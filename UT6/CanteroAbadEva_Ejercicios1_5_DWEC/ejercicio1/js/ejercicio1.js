let mapa = null;
let marcador = null;
let intervalo = null;

// Imagen del marcador
const iconoMarcador = L.icon({
    iconUrl: 'marcador.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
});

// Función para actualizar ubicación
function actualizarUbicacion() {
    // Opciones para mejor precisión
    const opciones = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
        function(posicion) {
            const lat = posicion.coords.latitude;
            const lng = posicion.coords.longitude;
            
            // Si no hay mapa, crearlo
            if (!mapa) {
                mapa = L.map('map').setView([lat, lng], 16);
                // URL CORREGIDA: tiene que tener la barra diagonal al final
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                }).addTo(mapa);
            }
            
            // Eliminar marcador anterior
            if (marcador) {
                mapa.removeLayer(marcador);
            }
            
            // Crear nuevo marcador
            marcador = L.marker([lat, lng], { icon: iconoMarcador })
                .addTo(mapa)
                .bindPopup(`
                    <div style="text-align:center">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" width="60" height="60">
                    </div>
                `)
                .openPopup();
            
            // Centrar mapa
            mapa.setView([lat, lng], 16);
        },
        function(error) {
            console.log('Error de geolocalización:', error.message);
        },
        opciones
    );
}

// Iniciar cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarUbicacion();
    intervalo = setInterval(actualizarUbicacion, 30000);
});

// Limpiar intervalo al salir
window.addEventListener('beforeunload', function() {
    if (intervalo) {
        clearInterval(intervalo);
    }
});