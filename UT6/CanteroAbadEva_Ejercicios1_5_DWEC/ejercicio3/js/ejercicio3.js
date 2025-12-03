// 1. Crear mapa en Cáceres
var map = L.map('map').setView([39.475, -6.37], 14);

// 2. Añadir mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// 3. TODOS los bares del JSON
var bares = [
    // Copia exacta de cada bar del JSON
    {nombre: "Farmacia Legend", telefono: "+34 927261052", comida: "No", lat: 39.475652, lng: -6.370867},
    {nombre: "Sala Barroco", telefono: "No disponible", comida: "No", lat: 39.473252, lng: -6.379866},
    {nombre: "Manómetro", telefono: "+34 927220614", comida: "Sí", lat: 39.471431, lng: -6.377899},
    {nombre: "Boogaloo", telefono: "+34 617604471", comida: "No", lat: 39.474189, lng: -6.378637},
    {nombre: "Lambretta", telefono: "+34 677480372", comida: "No", lat: 39.473158, lng: -6.380953},
    {nombre: "El Corral de las Cigüeñas", telefono: "927216425-647758245", comida: "Sí", lat: 39.474192, lng: -6.370927},
    {nombre: "Ático Club-Ático Chillout", telefono: "+34 639858897", comida: "No", lat: 39.467515, lng: -6.38543},
    {nombre: "La Traviata", telefono: "No disponible", comida: "No", lat: 39.472612, lng: -6.373483},
    {nombre: "Bulevar", telefono: "+34 686244000", comida: "No", lat: 39.472559, lng: -6.373759},
    {nombre: "Las Claras", telefono: "+34 618402756", comida: "No", lat: 39.471787, lng: -6.371898},
    {nombre: "Maria Mandiles", telefono: "No disponible", comida: "No", lat: 39.472625, lng: -6.373419},
    {nombre: "El Pequeño Gin", telefono: "+34 927761574", comida: "No", lat: 39.472202, lng: -6.37325}
];

// 4. Añadir marcadores
bares.forEach(function(bar) {
    L.marker([bar.lat, bar.lng])
        .addTo(map)
        .bindPopup(
            "<b>" + bar.nombre + "</b><br>" +
            "Tel: " + bar.telefono + "<br>" +
            "Comida: " + bar.comida
        );
});