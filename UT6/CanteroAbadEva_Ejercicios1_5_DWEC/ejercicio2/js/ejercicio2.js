// Inicializar el mapa centrado en Plasencia
const map = L.map('map').setView([40.0305, -6.0883], 14);

// Añadir capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Coordenadas aproximadas de los lugares (basadas en ubicaciones típicas)
const locations = {
    ayuntamiento: {
        coords: [40.02995343043314, -6.0897410698312715],
        type: "marker",
        title: "Ayuntamiento de Plasencia",
        description: "Edificio histórico que alberga la sede del gobierno municipal de Plasencia. Se encuentra en la Plaza Mayor, corazón de la ciudad.",
        link: "https://www.plasencia.es"
    },
    piscinaBioclimatica: {
        coords: [40.04495498185886, -6.085113671003055],
        type: "circle",
        title: "Piscina Bioclimática",
        description: "Instalación deportiva y de ocio con piscina climatizada que aprovecha las condiciones ambientales para optimizar el consumo energético.",
        link: "https://www.plasencia.es/turismo/que-ver/piscina-bioclimatica",
        radius: 50 // Radio en metros
    },
    instituto: {
        coords: [
    [40.04335850597098, -6.087055726425818],
    [40.04335850597098, -6.086555726425818],
    [40.04291850597098, -6.086555726425818],
    [40.04291850597098, -6.087055726425818],
    [40.04335850597098, -6.087055726425818]
],
        type: "polygon",
        title: "IES Valle del Jerte",
        description: "Instituto de Educación Secundaria ubicado en Plasencia. Ofrece formación en ESO, Bachillerato y ciclos formativos.",
        link: "https://iesvallejertepla.educarex.es"
    },
    estacionTren: {  
        coords: [
    [40.02240989977747, -6.099712769043673],
    [40.02240989977747, -6.099212769043673],
    [40.02196989977747, -6.099212769043673],
    [40.02196989977747, -6.099712769043673],
    [40.02240989977747, -6.099712769043673]
],
        type: "polygon",
        title: "Estación de Trenes de Plasencia",
        description: "Estación ferroviaria que conecta Plasencia con otras ciudades de la región. Ofrece servicios de media distancia.",
        link: "https://www.renfe.com"
    }
};

// Función para crear popup HTML
function createPopupHTML(location) {
    let color = '#3498db'; // Color por defecto
    
    if (location.type === "marker") {
        color = '#e74c3c';
    } else if (location.type === "circle") {
        color = '#3498db';
    } else if (location.type === "polygon1") {
        color = '#2ecc71';
    } else if (location.type === "polygon2") {
        color = '#cc682e';
    }
    
    return `
        <h3 style="margin-top: 0; color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 5px;">${location.title}</h3>
        <p>${location.description}</p>
        <a href="${location.link}" target="_blank" class="popup-link">Visitar sitio web</a>
    `;
}

// Crear marcador para el ayuntamiento
const ayuntamientoMarker = L.marker(locations.ayuntamiento.coords)
    .bindPopup(createPopupHTML(locations.ayuntamiento))
    .addTo(map);

// Crear círculo para la piscina bioclimática
const piscinaCircle = L.circle(locations.piscinaBioclimatica.coords, {
    color: '#3498db',
    fillColor: '#3498db',
    fillOpacity: 0.4,
    radius: locations.piscinaBioclimatica.radius
})
.bindPopup(createPopupHTML(locations.piscinaBioclimatica))
.addTo(map);

// Crear polígono para el instituto
const institutoPolygon = L.polygon(locations.instituto.coords, {
    color: '#2ecc71',
    fillColor: '#2ecc71',
    fillOpacity: 0.4
})
.bindPopup(createPopupHTML(locations.instituto))
.addTo(map);

// Crear polígono para la estación de tren
const estacionPolygon = L.polygon(locations.estacionTren.coords, {
    color: '#cc682e',
    fillColor: '#cc682e',
    fillOpacity: 0.4
})
.bindPopup(createPopupHTML(locations.estacionTren))
.addTo(map);

// Ajustar el mapa para mostrar todos los elementos
const allLayers = [ayuntamientoMarker, piscinaCircle, institutoPolygon, estacionPolygon];
const group = L.featureGroup(allLayers);
map.fitBounds(group.getBounds().pad(0.1));

// Añadir un control de capas para poder mostrar/ocultar elementos
const layerControl = L.control.layers(null, {
    "Ayuntamiento": ayuntamientoMarker,
    "Piscina Bioclimática": piscinaCircle,
    "Instituto": institutoPolygon,
    "Estación de Tren": estacionPolygon
}).addTo(map);

// Evento para abrir el popup del ayuntamiento al cargar la página
setTimeout(() => {
    ayuntamientoMarker.openPopup();
}, 1000);