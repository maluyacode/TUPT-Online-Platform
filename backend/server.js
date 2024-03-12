const dotenv = require('dotenv');
const { Server } = require('socket.io');
const mega = require('./utils/mega');
const connectDatabase = require('./config/database');
const app = require('./app');

dotenv.config({ path: './config/.env' });

// (async () => {
//     await mega.connect();
// })();
require('./config/cloudinary');
connectDatabase();

const port = process.env.PORT || 8080;
console.log(port)


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

        socket.emit('recieved-message', recipient);
        socket.broadcast.emit('push-to-admin', 'admin');
        if (user) {
            user.emit('recieved-message', recipient);
        }

    })

    socket.on('hide-message', (data) => {
        const { recipient } = JSON.parse(data);

        const user = connectedUsers.get(recipient);

        if (user) {
            user.emit('show-hidden-message', recipient);
        }
    })

    socket.on('new-announcement', (data) => {

        const { teacher, announcement, group } = JSON.parse(data);

        if (group) {

            const membersId = group.members.map(value => value._id);
            connectedUsers.forEach((value, key) => {
                if (membersId.includes(key)) {
                    const user = connectedUsers.get(key);
                    user.emit('push-announcement', data)
                }
            });

        } else {

            socket.broadcast.emit('push-announcement', data)

        }

    })

});
