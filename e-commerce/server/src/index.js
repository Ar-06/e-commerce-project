const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

app.use(morgan('dev'));

const routes = require('./api/endPoint');
app.use('/', routes);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('message', (data) => {
        const token = data.token;
        jwt.verify(token, 'Stack', (err, decoded) => {
            if(err) {
                return socket.emit('message', { message: 'Token inválido', userName: 'System' });
            }

            const message = data.message;
            const userName = decoded.user; 
            socket.broadcast.emit('message', { message, userName });
            socket.emit('message', { message, userName: 'Me' });
        });
    });
});

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
