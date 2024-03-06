import axios from "axios";

export const fetchTotalUsers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/dashboard/total-users`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }
}