import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastEmmiter {

    static success(message = 'Success', position = 'top-center') {
        toast.success(message, {
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    static error(message = 'Success', position = 'top-center') {
        toast.error(message, {
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    static info(message = 'Success', position = 'top-center') {
        toast.info(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    static warning(message = 'Success', position = 'top-center') {
        toast.warning(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}

export default ToastEmmiter