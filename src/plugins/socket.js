// plugins/socket.js
import { io } from "socket.io-client";

const socket = io("https://aura.armortemplate.com"); // Cambia la URL al del servidor socket.io
// const socket = io("http://192.168.1.3:7878"); // Cambia la URL al del servidor socket.io

//token

// socket.on("connect", () => {
//     console.log("Conectado al servidor de socket.io");
//     });

socket.on("disconnect", () => {
    console.log("Desconectado del servidor de socket.io");
    }
);

export default socket;
