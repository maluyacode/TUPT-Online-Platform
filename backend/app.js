const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const collabRoutes = require('./routes/collabRoutes');
const commentRoutes = require('./routes/commentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const videoTutorialRoutes = require('./routes/videoTutorialRoutes');

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://tupt-online-platform.vercel.app'
    ],
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
app.use('/api/v1/announcement', announcementRoutes);
app.use('/api/v1/collab', collabRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/incident', incidentRoutes);
app.use('/api/v1/video-tutorial', videoTutorialRoutes);


module.exports = app;