const dotenv = require('dotenv');
// const { createServer } = require('node:http');
const { Server } = require('socket.io');


const connectDatabase = require('./config/database');
const app = require('./app');
require('./config/cloudinary');

dotenv.config({ path: './config/.env' });
connectDatabase();

const port = process.env.PORT || 8080;


const server = app.listen(port, () => console.log(`Server Started: http://localhost:${port}/`))


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('message', (message) => {
        socket.broadcast.emit('server', message)
    })

});