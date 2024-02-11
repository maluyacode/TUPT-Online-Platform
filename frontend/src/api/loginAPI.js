import axios from 'axios'

const loginAPI = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/login`, formData, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export default loginAPI