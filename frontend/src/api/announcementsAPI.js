import axios from "axios";

export const getAnnouncements = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/get-all`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }
}

export const getAnnouncement = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/get-single/${id}`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }

}

export const getMyAnnouncements = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/get-my-announcement/${id}`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }

}