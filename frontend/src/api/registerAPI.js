import axios from 'axios'

const registerAPI = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`, formData);
        return response

    } catch (err) {
        console.log(err);
        return false
    }
}

export default registerAPI