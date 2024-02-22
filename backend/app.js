const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');

const corsOptions = {
    origin: 'http://localhost:3000', //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
// app.options("*", cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/group', groupRoutes);


module.exports = app;