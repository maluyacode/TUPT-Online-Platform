const dotenv = require('dotenv');
const { Server } = require('socket.io');
const mega = require('./utils/mega');
const connectDatabase = require('./config/database');
const app = require('./prodApp');

dotenv.config({ path: './config/.env' });

(async () => {
    await mega.connect();
})();

require('./config/cloudinary');
connectDatabase();

const port = process.env.PORT || 8080;

const server = app.listen(port, () => console.log(`Server Started`))

const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'https://tupt-online-platform.vercel.app',
            'https://tupt-online-platform.onrender.com',
        ],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const connectedUsers = new Map();

io.on('connection', (socket) => {

    const { user } = socket.handshake.query
    connectedUsers.set(user, socket);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })

    socket.on('send', (data) => {
        const { message, recipient } = JSON.parse(data);
        console.log(recipient)
        const user = connectedUsers.get(recipient);

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
        console.log(group)
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
