const express = require('express');
const path = require('path');
const fs = require('fs');
const history = require('connect-history-api-fallback');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cambia al dominio y puerto de tu frontend
    methods: ["GET", "POST"],
    credentials: true, // Permitir cookies o encabezados con credenciales
  },
});
const { join } = require('node:path');
const { emit } = require('process');
const cors = require('cors');

const axios = require('axios');
app.use(cors());
app.use(express.json());


//aura
const meta_img = 'https://i.ibb.co/s1cJWSX/Aura-Meta-Tickets.jpg';


// Variables globales para manejar usuarios y mensajes
let onlineUsers = 0; // Contador de usuarios en línea
let usuarios = [];
let messages = [];   // Almacena el historial de mensajes




// Manejo de conexión de clientes
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Incrementar el contador de usuarios en línea
  onlineUsers++;

  console.log("Usuarios en línea:", onlineUsers);

  // Notificar a todos los clientes el número de usuarios conectados
  io.emit("updateOnlineUsers", onlineUsers);

  // Enviar historial de mensajes al nuevo cliente conectado
  socket.emit("loadMessages", messages);

  socket.on("join", (data) => {
    console.log("Usuarios", usuarios);

    if (data.user) {
      let existingUser = usuarios.find((user) => user._id === data.user._id);

      if (existingUser) {
        // Si el usuario ya está en la lista, solo actualiza su socketId
        existingUser.socketId = socket.id;
      } else {
        // Si el usuario no está, lo agrega
        data.user.socketId = socket.id;
        usuarios.push(data.user);
      }

      // Notificar a todos los clientes la lista actualizada de usuarios
      io.emit("updateUsers", usuarios);
    }
  });

  socket.on("sendMessage", (data) => {
    console.log("Mensaje recibido:", data);

    // Agregar mensaje al historial
    messages.push(data);

    // Enviar el mensaje a todos los clientes
    io.emit("receiveMessage", data);
  });

  // Manejar desconexión de clientes
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);

    // Decrementar el contador de usuarios en línea
    onlineUsers--;
    console.log("Usuarios en línea:", onlineUsers);

    // Remover el usuario de la lista basado en el socketId
    usuarios = usuarios.filter((user) => user.socketId !== socket.id);
    console.log("Usuarios conectados:", usuarios);

    // Enviar la lista de usuarios actualizada a todos los clientes
    io.emit("updateUsers", usuarios);

    // Notificar a todos los clientes el número actualizado de usuarios conectados
    io.emit("updateOnlineUsers", onlineUsers);
  });
});


//aztec
// const meta_img = 'https://i.ibb.co/XyXMvXy/meta-img.jpg';

// Meta tags definidos como JSON para facilitar cambios
const metaTagsConfig = {
  '/comprar': {
    title: 'Compra Entradas Anticipadas para el Evento de Rap y Electrónica en Capilla del Monte',
    description: 'No te pierdas el evento de rap y electrónica más esperado del 2025 en Capilla del Monte. ¡Compra tus entradas anticipadas antes de que suban de precio!',
    keywords: 'entradas anticipadas, evento Capilla del Monte, rap, electrónica, música en vivo, entradas 2025, eventos Aura Producciones',
    author: 'Aura Producciones',
    ogTitle: 'Compra Entradas para el Evento de Rap y Electrónica',
    ogDescription: 'Adquiere tus entradas anticipadas para el evento de rap y electrónica en Capilla del Monte. ¡Aprovecha los precios antes del aumento!',
    ogImage: meta_img,
    ogUrl: 'https://auraproducciones.lat/comprar',
    twitterCard: 'summary_large_image'
  },
  '/': {
    title: 'Radio Aura en Vivo desde Capilla del Monte, Córdoba | Música las 24 Horas',
    description: 'Sintoniza Radio Aura, la emisora en vivo desde Capilla del Monte, Córdoba, con música y contenido las 24 horas del día.',
    keywords: 'Radio Aura, Capilla del Monte, Córdoba, música en vivo, streaming 24 horas, radio online, programación continua',
    author: 'Radio Aura',
    ogTitle: 'Radio Aura en Vivo - Música y Contenido las 24 Horas desde Capilla del Monte',
    ogDescription: 'Escucha Radio Aura, la emisora en vivo desde Capilla del Monte, Córdoba. Transmisión las 24 horas con música y programas para ti.',
    ogImage: "https://auraproducciones.lat/img/Ahora-en-Vivo.761dae10.png",
    ogUrl: 'https://auraproducciones.lat',
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

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, './dist/index.html'));
});

// Manejo del modo History para Vue.js Router
app.use(history());

// Sirviendo archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Iniciar el servidor


server.listen(4444, () => {
  console.log('server running at http://localhost:4444');
});
