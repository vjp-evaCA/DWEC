let myChart = null;

document.getElementById('csvFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        loadCSVFile(file);
    }
});

function loadCSVFile(file) {
    showLoading('Leyendo archivo...');
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const csvText = e.target.result;
            processCSVData(csvText);
        } catch (error) {
            showError('Error al leer el archivo: ' + error.message);
        }
    };
    
    reader.onerror = function() {
        showError('Error al leer el archivo.');
    };
    
    reader.readAsText(file);
}

function processCSVData(csvText) {
    try {
        showLoading('Procesando datos...');
        
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        console.log('Columnas encontradas:', headers);
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const values = lines[i].split(',').map(value => value.trim());
            const row = {};
            
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            
            data.push(row);
        }
        
        createChartByYear(data, headers);
        
    } catch (error) {
        showError('Error al procesar el CSV: ' + error.message);
    }
}

function createChartByYear(data, headers) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Buscar columnas
    const dateColumn = findColumn(headers, ['release_date', 'date', 'fecha', 'release', 'year']);
    const popularityColumn = findColumn(headers, ['popularity', 'popular', 'rating', 'score', 'Popularity', 'Rating']);
    
    console.log('Columna de fecha:', dateColumn);
    console.log('Columna de popularidad:', popularityColumn);
    
    if (!dateColumn || !popularityColumn) {
        showError('No se encontraron las columnas necesarias. Columnas disponibles: ' + headers.join(', '));
        return;
    }
    
    // Agrupar por año
    const yearData = groupByYear(data, dateColumn, popularityColumn);
    
    if (yearData.labels.length === 0) {
        showError('No se pudieron extraer años de las fechas');
        return;
    }
    
    // Destruir gráfico anterior si existe
    if (myChart) {
        myChart.destroy();
    }
    
    hideLoading();
    
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearData.labels,
            datasets: [{
                label: 'Popularidad Media',
                data: yearData.popularity,
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Popularidad Media por Año',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const year = yearData.labels[context.dataIndex];
                            const count = yearData.counts[context.dataIndex];
                            return `Películas: ${count}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Popularidad Media'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Años'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    });
}

function groupByYear(data, dateColumn, popularityColumn) {
    const yearMap = {};
    
    // Procesar cada película
    data.forEach(row => {
        if (!row[dateColumn] || !row[popularityColumn]) return;
        
        const dateString = row[dateColumn];
        const popularityValue = parseFloat(row[popularityColumn]);
        
        if (isNaN(popularityValue)) return;
        
        // Extraer el año de la fecha
        const year = extractYear(dateString);
        
        if (year) {
            if (!yearMap[year]) {
                yearMap[year] = {
                    total: 0,
                    count: 0
                };
            }
            
            yearMap[year].total += popularityValue;
            yearMap[year].count += 1;
        }
    });
    
    // Convertir a arrays para el gráfico
    const years = Object.keys(yearMap).sort();
    const labels = [];
    const popularity = [];
    const counts = [];
    
    years.forEach(year => {
        const data = yearMap[year];
        const average = data.total / data.count;
        
        labels.push(year);
        popularity.push(parseFloat(average.toFixed(2)));
        counts.push(data.count);
    });
    
    return { labels, popularity, counts };
}

function extractYear(dateString) {
    try {
        // Intentar diferentes formatos de fecha
        const date = new Date(dateString);
        
        if (!isNaN(date.getTime())) {
            return date.getFullYear().toString();
        }
        
        // Si es solo un año (ej: "2025")
        if (/^\d{4}$/.test(dateString)) {
            return dateString;
        }
        
        // Si tiene formato YYYY-MM-DD
        const yearMatch = dateString.match(/^(\d{4})/);
        if (yearMatch) {
            return yearMatch[1];
        }
        
        return null;
    } catch (error) {
        return null;
    }
}

function findColumn(headers, possibleNames) {
    for (let name of possibleNames) {
        const found = headers.find(header => 
            header.toLowerCase().includes(name.toLowerCase())
        );
        if (found) return found;
    }
    return null;
}

function showLoading(message) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loading').textContent = message;
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loading').innerHTML = '<span style="color: red;">' + message + '</span>';
}