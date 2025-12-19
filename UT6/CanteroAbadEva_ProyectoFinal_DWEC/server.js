// server.js - CREAR EN LA RAIZ (al lado de db.json)
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configurar CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Usar middlewares y router
server.use(middlewares);
server.use(router);

// Puerto
const PORT = 3000;
server.listen(PORT, () => {
    console.log('✅ JSON Server con CORS habilitado');
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log('📂 Endpoints disponibles:');
    console.log(`   • http://localhost:${PORT}/electronica`);
    console.log(`   • http://localhost:${PORT}/muebles`);
    console.log(`   • http://localhost:${PORT}/decoracion`);
});