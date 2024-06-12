import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('WebSocket connected');

  socket.on('message', (data) => {
    io.emit('res', data);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
K;
