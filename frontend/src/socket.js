import { io } from 'socket.io-client';
import { getUser, isAuthenticated } from './utils/helper';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';

const config = {
    autoConnect: false,
}

if (isAuthenticated() && getUser()) {
    config.query = {
        user: getUser()._id
    }
}

export const socket = io(URL, config);