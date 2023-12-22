const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// Manejo del modo History para Vue.js Router
app.use(history());

// Sirviendo archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta raíz, sirviendo el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
const port = 3322;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
