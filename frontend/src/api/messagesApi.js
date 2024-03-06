import axios from 'axios'

export const notifyApi = async (formData) => {

    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/message/notify-user`, formData, {
            withCredentials: true
        });

        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}
