const dotenv = require('dotenv');
// const { createServer } = require('node:http');
const { Server } = require('socket.io');


const connectDatabase = require('./config/database');
const app = require('./app');

dotenv.config({ path: './config/.env' });

require('./config/cloudinary');
connectDatabase();

const port = process.env.PORT || 8080;


const server = app.listen(port, () => console.log(`Server Started: http://localhost:${port}/`))


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const connectedUsers = new Map();

io.on('connection', (socket) => {

    // console.log(socket.handshake.query)
    const { user } = socket.handshake.query
    connectedUsers.set(user, socket);
    // console.log(connectedUsers)

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('send', (data) => {
        const { message, recipient } = JSON.parse(data);
        console.log(recipient)
        const user = connectedUsers.get(recipient);
        console.log(user)

        socket.emit('recieved-message');

        if (user) {
            user.emit('recieved-message');
        }

    })


});