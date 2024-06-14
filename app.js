import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/conchat.js', (req, res) => {
  // res.send(
  //   'console.log("hello"); const con = {chat: function () {console.log("conchat");}};'
  // );
  res.sendFile(join(__dirname, 'index.html'));
});

// app.get('/conchat.html', (req, res) => {
//   res.sendFile(join(__dirname, 'conchat.html'));
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running!!`);
});

function teamMacos() {
  return 'team macos';
}
