let myChart = null;

// Calcular la progresión salarial
function calcularProgresion() {
    const salarioInicial = parseFloat(document.getElementById('salarioInicial').value);
    
    if (isNaN(salarioInicial) || salarioInicial <= 0) {
        alert('Por favor, introduce un salario inicial válido');
        return;
    }

    const años = 10;
    const incrementoAnual = 0.03; // 3%
    const incrementoFijo = 60; // 60€ anuales

    // Calcular salarios para cada año (ambos métodos)
    const labels = [];
    const salariosPorcentaje = [];
    const salariosFijo = [];
    const detalles = [];

    let salarioActualPorcentaje = salarioInicial;
    let salarioActualFijo = salarioInicial;
    
    for (let año = 1; año <= años; año++) {
        labels.push(`Año ${año}`);
        
        // Salario con incremento del 3%
        salariosPorcentaje.push(parseFloat(salarioActualPorcentaje.toFixed(2)));
        
        // Salario con incremento fijo de 60€
        salariosFijo.push(parseFloat(salarioActualFijo.toFixed(2)));
        
        detalles.push({
            año: año,
            salarioPorcentaje: salarioActualPorcentaje,
            salarioFijo: salarioActualFijo,
            incrementoPorcentaje: año === 1 ? 0 : salarioActualPorcentaje - salariosPorcentaje[año - 2],
            incrementoFijo: año === 1 ? 0 : salarioActualFijo - salariosFijo[año - 2]
        });
        
        // Calcular salario del próximo año
        salarioActualPorcentaje = salarioActualPorcentaje * (1 + incrementoAnual);
        salarioActualFijo = salarioActualFijo + incrementoFijo;
    }

    // Crear o actualizar el gráfico
    crearGraficoLineas(labels, salariosPorcentaje, salariosFijo);
    
    // Mostrar resultados detallados
    mostrarResultados(detalles, salarioInicial);
}

function crearGraficoLineas(labels, datosPorcentaje, datosFijo) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Salario con 3% anual',
                    data: datosPorcentaje,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3,
                    tension: 0.1,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Salario con 60€ anuales',
                    data: datosFijo,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 3,
                    tension: 0.1,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación: 3% Anual vs 60€ Anuales',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString('es-ES', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} €`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Salario (€)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('es-ES') + ' €';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Años'
                    }
                }
            }
        }
    });
}

function mostrarResultados(detalles, salarioInicial) {
    const resultsDiv = document.getElementById('results');
    let html = '<h3>📊 Detalle de la Progresión Salarial</h3>';
    html += '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
    html += '<tr style="background-color: #e9ecef;">';
    html += '<th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Año</th>';
    html += '<th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Salario 3% (€)</th>';
    html += '<th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Incremento 3% (€)</th>';
    html += '<th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Salario 60€ (€)</th>';
    html += '<th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Incremento 60€ (€)</th>';
    html += '</tr>';

    detalles.forEach(detalle => {
        html += '<tr>';
        html += `<td style="padding: 10px; border: 1px solid #ddd;">${detalle.año}</td>`;
        
        // Salario con 3%
        html += `<td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${detalle.salarioPorcentaje.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} €</td>`;
        html += `<td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${detalle.incrementoPorcentaje.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} €</td>`;
        
        // Salario con 60€
        html += `<td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${detalle.salarioFijo.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} €</td>`;
        html += `<td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${detalle.incrementoFijo.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} €</td>`;
        html += '</tr>';
    });

    html += '</table>';

    // Resumen final
    const salarioFinalPorcentaje = detalles[detalles.length - 1].salarioPorcentaje;
    const salarioFinalFijo = detalles[detalles.length - 1].salarioFijo;
    
    const incrementoTotalPorcentaje = ((salarioFinalPorcentaje - salarioInicial) / salarioInicial * 100).toFixed(2);
    const incrementoTotalFijo = ((salarioFinalFijo - salarioInicial) / salarioInicial * 100).toFixed(2);
    
    const diferenciaFinal = salarioFinalPorcentaje - salarioFinalFijo;
    
    html += `<div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">`;
    
    // Resumen 3%
    html += `<div style="padding: 15px; background-color: #d4edda; border-radius: 5px;">`;
    html += `<strong>📈 Con 3% anual:</strong><br>`;
    html += `• Salario inicial: ${salarioInicial.toLocaleString('es-ES')} €<br>`;
    html += `• Salario final: ${salarioFinalPorcentaje.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} €<br>`;
    html += `• Incremento total: ${incrementoTotalPorcentaje}%`;
    html += `</div>`;
    
    // Resumen 60€
    html += `<div style="padding: 15px; background-color: #f8d7da; border-radius: 5px;">`;
    html += `<strong>💰 Con 60€ anuales:</strong><br>`;
    html += `• Salario inicial: ${salarioInicial.toLocaleString('es-ES')} €<br>`;
    html += `• Salario final: ${salarioFinalFijo.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} €<br>`;
    html += `• Incremento total: ${incrementoTotalFijo}%`;
    html += `</div>`;
    
    html += `</div>`;
    
    // Comparación
    html += `<div style="margin-top: 15px; padding: 15px; background-color: #e7f3ff; border-radius: 5px; text-align: center;">`;
    html += `<strong>⚖️ Comparación final:</strong><br>`;
    if (diferenciaFinal > 0) {
        html += `El incremento del 3% genera ${diferenciaFinal.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} € más después de 10 años`;
    } else if (diferenciaFinal < 0) {
        html += `El incremento de 60€ genera ${Math.abs(diferenciaFinal).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} € más después de 10 años`;
    } else {
        html += `Ambos métodos generan el mismo salario final`;
    }
    html += `</div>`;

    resultsDiv.innerHTML = html;
}

// Calcular automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    calcularProgresion();
});