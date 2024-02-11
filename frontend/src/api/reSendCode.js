import axios from 'axios'

const reSendCode = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/resend-code`, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export default reSendCode