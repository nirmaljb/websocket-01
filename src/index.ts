import WebSocket, { WebSocketServer } from "ws";
import express from "express";

// const server = http.createServer(function(request: any, response: any) {
//     console.log((new Date()) + 'recieved request for ' + request.url);
//     response.end("Hi there");
// })

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

let users = 0;
wss.on('connection', function connection(socket) {
    socket.on('error', console.error);

    socket.on('message', function message(data, isBinary) {
        console.log(data);
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                console.log("recieved: %s ", data);
                client.send(data, { binary: isBinary });
            }
        })
    })
    console.log('users connected: ', ++users);
    socket.send('Hello!, Message from websocket');
});

// server.listen(8080, () => {
//     console.log('Listening to port 8080');
// })
