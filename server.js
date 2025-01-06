const express = require('express');
const path = require('path');
const fs = require('fs');
const history = require('connect-history-api-fallback');

const app = express();

//aura
const meta_img = 'https://i.ibb.co/LJCLSDc/Aura-Meta-Tickets.jpg';

//aztec
// const meta_img = 'https://i.ibb.co/XyXMvXy/meta-img.jpg';

// Meta tags definidos como JSON para facilitar cambios
const metaTagsConfig = {
  '/comprar': {
    title: 'Comprar entradas para el evento',
    description: 'Compra tus entradas para el evento más esperado.',
    keywords: 'entradas, evento, comprar, música, teatro',
    author: 'Charly G Producciones',
    ogTitle: 'Comprar entradas para el evento',
    ogDescription: 'Compra tus entradas para el evento más esperado.',
    // ogImage: 'https://charlygproducciones.com/img/logo.86714784.png', ahora en meta_img.jpeg
    ogImage: meta_img,
    ogUrl: 'https://charlygproducciones.com/comprar',
    twitterCard: 'summary_large_image'
  },
  '/': {
    title: 'Página principal',
    description: 'Bienvenido a Charly G Producciones. Descubre los mejores eventos.',
    keywords: 'eventos, música, teatro, entradas',
    author: 'Charly G Producciones',
    ogTitle: 'Página principal',
    ogDescription: 'Bienvenido a Charly G Producciones. Descubre los mejores eventos.',
    ogImage: meta_img,
    ogUrl: 'https://charlygproducciones.com',
    twitterCard: 'summary_large_image'
  }
};

// Middleware para manejar la inyección de meta tags dinámicos
app.use((req, res, next) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const metaTags = metaTagsConfig[req.url];

  if (metaTags) {
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo index.html:', err);
        return res.status(500).send('Error interno del servidor');
      }

      // Construcción dinámica de los meta tags
      const metaTagsHtml = `
        <title>${metaTags.title}</title>
        <meta name="description" content="${metaTags.description}">
        <meta name="keywords" content="${metaTags.keywords}">
        <meta name="author" content="${metaTags.author}">
        <meta property="og:title" content="${metaTags.ogTitle}">
        <meta property="og:description" content="${metaTags.ogDescription}">
        <meta property="og:image" content="${metaTags.ogImage}">
        <meta property="og:url" content="${metaTags.ogUrl}">
        <meta name="twitter:card" content="${metaTags.twitterCard}">
      `;

      const modifiedHtml = data.replace('</head>', `${metaTagsHtml}</head>`);
      res.send(modifiedHtml);
    });
  } else {
    next(); // Continuar con el siguiente middleware si no hay meta tags definidos
  }
});

// Manejo del modo History para Vue.js Router
app.use(history());

// Sirviendo archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Iniciar el servidor
const port = 4444;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
