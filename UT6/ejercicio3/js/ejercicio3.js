// Bloques de personajes de Street Fighter con datos reales
const bloques = [
    {
        nombre: "Bloque 1",
        color: '#FF6B6B',
        borderColor: '#FF4757',
        personajes: [
            {
                nombre: "Birdie",
                salud: 4,
                fuerza: 4,
                alcance: 4,
                tecnica: 3,
                movilidad: 1,
                color: 'rgba(255, 107, 107, 0.7)',
                borderColor: 'rgba(255, 71, 87, 1)'
            },
            {
                nombre: "Cammy",
                salud: 2,
                fuerza: 3,
                alcance: 3,
                tecnica: 2,
                movilidad: 5,
                color: 'rgba(70, 130, 180, 0.7)',
                borderColor: 'rgba(65, 105, 225, 1)'
            },
            {
                nombre: "Chun-Li",
                salud: 2,
                fuerza: 2,
                alcance: 3,
                tecnica: 4,
                movilidad: 4,
                color: 'rgba(106, 90, 205, 0.7)',
                borderColor: 'rgba(123, 104, 238, 1)'
            }
        ]
    },
    {
        nombre: "Bloque 2",
        color: '#4ECDC4',
        borderColor: '#45B7AF',
        personajes: [
            {
                nombre: "Dhalsim",
                salud: 2,
                fuerza: 3,
                alcance: 5,
                tecnica: 3,
                movilidad: 1,
                color: 'rgba(78, 205, 196, 0.7)',
                borderColor: 'rgba(69, 183, 175, 1)'
            },
            {
                nombre: "Karin",
                salud: 2,
                fuerza: 3,
                alcance: 2,
                tecnica: 5,
                movilidad: 4,
                color: 'rgba(255, 165, 0, 0.7)',
                borderColor: 'rgba(255, 140, 0, 1)'
            },
            {
                nombre: "Ken",
                salud: 3,
                fuerza: 3,
                alcance: 3,
                tecnica: 2,
                movilidad: 4,
                color: 'rgba(255, 69, 0, 0.7)',
                borderColor: 'rgba(255, 99, 71, 1)'
            }
        ]
    },
    {
        nombre: "Bloque 3",
        color: '#45B7D1',
        borderColor: '#3CA3BB',
        personajes: [
            {
                nombre: "Laura",
                salud: 3,
                fuerza: 3,
                alcance: 1,
                tecnica: 3,
                movilidad: 4,
                color: 'rgba(69, 183, 209, 0.7)',
                borderColor: 'rgba(60, 163, 187, 1)'
            },
            {
                nombre: "M. Bison",
                salud: 3,
                fuerza: 5,
                alcance: 3,
                tecnica: 4,
                movilidad: 4,
                color: 'rgba(138, 43, 226, 0.7)',
                borderColor: 'rgba(123, 36, 206, 1)'
            },
            {
                nombre: "Nash",
                salud: 3,
                fuerza: 3,
                alcance: 3,
                tecnica: 3,
                movilidad: 4,
                color: 'rgba(32, 178, 170, 0.7)',
                borderColor: 'rgba(28, 156, 149, 1)'
            }
        ]
    },
    {
        nombre: "Bloque 4",
        color: '#96CEB4',
        borderColor: '#85B89D',
        personajes: [
            {
                nombre: "Necalli",
                salud: 4,
                fuerza: 5,
                alcance: 3,
                tecnica: 2,
                movilidad: 4,
                color: 'rgba(150, 206, 180, 0.7)',
                borderColor: 'rgba(133, 184, 157, 1)'
            },
            {
                nombre: "Rashid",
                salud: 3,
                fuerza: 2,
                alcance: 2,
                tecnica: 3,
                movilidad: 4,
                color: 'rgba(65, 105, 225, 0.7)',
                borderColor: 'rgba(58, 95, 205, 1)'
            },
            {
                nombre: "R. Mika",
                salud: 3,
                fuerza: 3,
                alcance: 1,
                tecnica: 4,
                movilidad: 2,
                color: 'rgba(255, 105, 180, 0.7)',
                borderColor: 'rgba(255, 92, 165, 1)'
            }
        ]
    },
    {
        nombre: "Bloque 5",
        color: '#FFEAA7',
        borderColor: '#E6D396',
        personajes: [
            {
                nombre: "Ryu",
                salud: 3,
                fuerza: 4,
                alcance: 4,
                tecnica: 2,
                movilidad: 3,
                color: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 71, 87, 1)'
            },
            {
                nombre: "Vega",
                salud: 2,
                fuerza: 3,
                alcance: 3,
                tecnica: 3,
                movilidad: 5,
                color: 'rgba(153, 102, 255, 0.7)',
                borderColor: 'rgba(138, 92, 230, 1)'
            },
            {
                nombre: "Zangief",
                salud: 5,
                fuerza: 5,
                alcance: 3,
                tecnica: 2,
                movilidad: 1,
                color: 'rgba(255, 159, 64, 0.7)',
                borderColor: 'rgba(255, 140, 40, 1)'
            }
        ]
    }
];

// Crear la gráfica radar
function crearGraficaRadar() {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Preparar todos los datasets
    const datasets = [];
    bloques.forEach(bloque => {
        bloque.personajes.forEach(personaje => {
            datasets.push({
                label: personaje.nombre,
                data: [
                    personaje.salud,
                    personaje.fuerza,
                    personaje.alcance,
                    personaje.tecnica,
                    personaje.movilidad
                ],
                backgroundColor: personaje.color,
                borderColor: personaje.borderColor,
                borderWidth: 2,
                pointBackgroundColor: personaje.borderColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 3,
                pointHoverRadius: 5
            });
        });
    });

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Salud', 'Fuerza', 'Alcance', 'Técnica', 'Movilidad'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Street Fighter - Comparación de 15 Personajes por Bloques',
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 11
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}/5`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    min: 0,
                    ticks: {
                        stepSize: 1,
                        backdropColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        }
    });

    // Mostrar bloques de personajes
    mostrarBloquesPersonajes();
}

function mostrarBloquesPersonajes() {
    const container = document.getElementById('blocksContainer');
    
    const html = bloques.map(bloque => `
        <div class="block" style="border-left-color: ${bloque.borderColor}; background: ${bloque.color}20;">
            <div class="block-title" style="color: ${bloque.borderColor};">${bloque.nombre}</div>
            ${bloque.personajes.map(personaje => `
                <div class="character-card" style="background: ${personaje.color.replace('0.7', '0.9')}">
                    <strong>${personaje.nombre}</strong>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-top: 8px; font-size: 12px;">
                        <div>❤️ Salud: ${personaje.salud}/5</div>
                        <div>💪 Fuerza: ${personaje.fuerza}/5</div>
                        <div>📏 Alcance: ${personaje.alcance}/5</div>
                        <div>🎯 Técnica: ${personaje.tecnica}/5</div>
                        <div>⚡ Movilidad: ${personaje.movilidad}/5</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    container.innerHTML = html;
}

// Inicializar la gráfica cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    crearGraficaRadar();
});