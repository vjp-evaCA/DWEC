// Variables globales
let map = null;
let marker = null;
let updateInterval = null;
let updateCount = 0;
let countdown = 30;

// Coordenadas exactas del IES Valle del Jerte
const IES_COORDS = {
    lat: 40.043021,
    lng: -6.086801
};

// Dirección completa - CORREGIDA: 10600 no 10000
const IES_ADDRESS = "C. de Francisco Paniagua Loaisa, 3, 10600 Plasencia, Cáceres";

// Ruta a la imagen local del marcador
const MARKER_IMAGE = 'marcador.png';

// Función para crear icono personalizado con imagen local
function createCustomIcon() {
    return L.icon({
        iconUrl: MARKER_IMAGE,  // Imagen local
        iconSize: [64, 64],     // Tamaño del icono
        iconAnchor: [32, 64],   // Punto de anclaje
        popupAnchor: [0, -64]   // Posición del popup
    });
}

// Inicializar el mapa
function initMap() {
    console.log("🔄 Inicializando mapa...");
    
    // Crear mapa centrado en las coordenadas del IES
    map = L.map('map').setView([IES_COORDS.lat, IES_COORDS.lng], 17);
    
    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    console.log("✅ Mapa inicializado");
    return map;
}

// Crear o actualizar el marcador
function updateMarker() {
    updateCount++;
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    console.log(`🔄 Actualización #${updateCount} - ${timeString}`);
    
    // Si no hay mapa, crearlo
    if (!map) {
        initMap();
    }
    
    // Eliminar marcador anterior si existe
    if (marker) {
        map.removeLayer(marker);
    }
    
    // Crear nuevo marcador con imagen local
    marker = L.marker([IES_COORDS.lat, IES_COORDS.lng], {
        icon: createCustomIcon(),
        title: "IES Valle del Jerte"
    })
    .addTo(map)
    .bindPopup(`
        <div style="text-align: center; min-width: 250px; padding: 10px;">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">🏫</div>
            <strong style="color: #2c3e50; font-size: 1.3rem;">IES VALLE DEL JERTE</strong><br>
            <span style="color: #7f8c8d; font-size: 0.9rem;">Plasencia, Cáceres</span>
            <hr style="margin: 15px 0; border-color: #eee;">
            <div style="text-align: left; font-size: 0.9rem;">
                <div><strong>📍 Dirección:</strong></div>
                <div style="color: #555; margin: 5px 0; font-size: 0.85rem;">
                    ${IES_ADDRESS}
                </div>
                <div><strong>📐 Coordenadas:</strong></div>
                <div style="font-family: monospace; background: #f8f9fa; padding: 8px; border-radius: 4px; margin: 5px 0;">
                    Lat: ${IES_COORDS.lat.toFixed(6)}<br>
                    Lon: ${IES_COORDS.lng.toFixed(6)}
                </div>
                <div><strong>⏰ Actualización #${updateCount}</strong></div>
                <div>🕒 ${timeString}</div>
            </div>
        </div>
    `)
    .openPopup();
    
    // Actualizar información en la página
    updateDisplayInfo(timeString);
    
    // Reiniciar cuenta regresiva
    countdown = 30;
}

// Actualizar la información en pantalla
function updateDisplayInfo(timeString) {
    // Actualizar coordenadas
    document.getElementById('lat').textContent = IES_COORDS.lat.toFixed(6);
    document.getElementById('lng').textContent = IES_COORDS.lng.toFixed(6);
    
    // Actualizar información de actualización
    document.getElementById('last-update').textContent = timeString;
    document.getElementById('counter').textContent = updateCount;
}

// Función de cuenta regresiva
function updateCountdown() {
    countdown--;
    document.getElementById('next-update').textContent = countdown;
    
    if (countdown <= 0) {
        countdown = 30;
    }
}

// Inicializar la aplicación
function initApp() {
    console.log("=".repeat(60));
    console.log("🚀 EJERCICIO 1 - Geolocalización con actualización automática");
    console.log(`📍 IES Valle del Jerte: ${IES_COORDS.lat}, ${IES_COORDS.lng}`);
    console.log("⏱️  Actualización cada 30 segundos usando setInterval");
    console.log("🖼️  Marcador con imagen local: " + MARKER_IMAGE);
    console.log("=".repeat(60));
    
    // Inicializar mapa y primer marcador
    updateMarker();
    
    // Configurar actualización automática cada 30 segundos (30000 ms)
    updateInterval = setInterval(updateMarker, 30000);
    
    // Configurar cuenta regresiva cada segundo (1000 ms)
    setInterval(updateCountdown, 1000);
    
    // Añadir interacción: clic en el mapa para ver coordenadas
    if (map) {
        map.on('click', function(e) {
            const clickCoords = {
                lat: e.latlng.lat.toFixed(6),
                lng: e.latlng.lng.toFixed(6)
            };
            
            // Marcador temporal
            L.marker(e.latlng, {
                icon: L.icon({
                    iconUrl: MARKER_IMAGE,
                    iconSize: [40, 40]
                })
            })
            .addTo(map)
            .bindPopup(`Clic en: ${clickCoords.lat}, ${clickCoords.lng}`)
            .openPopup();
            
            console.log(`🖱️ Clic en mapa: ${clickCoords.lat}, ${clickCoords.lng}`);
        });
    }
}

// Cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);

// Limpiar recursos al salir
window.addEventListener('beforeunload', function() {
    if (updateInterval) {
        clearInterval(updateInterval);
        console.log("🛑 Intervalo de actualización detenido");
    }
});