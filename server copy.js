const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

//incluir archivos estaticos
app.use(express.static(join(__dirname, './')));
// Contador de usuarios en línea
let onlineUsers = 0;

app.get('/test', (req, res) => {
  res.sendFile(join(__dirname, 'test.html'));
});
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Servir el archivo auth.html
app.get('/autologin', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Incrementar usuarios en línea
  onlineUsers++;
  // Enviar número actualizado de usuarios a todos los clientes
  io.emit('updateOnlineUsers', onlineUsers);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    
    // Decrementar usuarios en línea
    onlineUsers--;
    // Enviar número actualizado de usuarios a todos los clientes
    io.emit('updateOnlineUsers', onlineUsers);
  });
});

server.listen(7878, () => {
  console.log('server running at http://localhost:7878');
});
