const connectDatabase = require('./config/database');
const app = require('./app');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

const port = process.env.PORT || 8080;

dotenv.config({ path: './config/.env' });
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(port, () => console.log(`Server Started: http://localhost:${port}/`))