/* const io = require("socket.io-client");
const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });
module.exports = {
    "aapp": socket
}

socket.onAny((event, ...args) => {
    console.log(event, args);
  }); */

const socket = io("ws://localhost:1338");

socket.on("connect", () => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    console.log("HOLA MUNDO SOCKETS");
  });