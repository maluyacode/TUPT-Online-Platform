import axios from 'axios'

const verifyAPI = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/verification`, formData, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        return response
    }
}

export default verifyAPI