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
export const fetchTotalAnnouncements = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/dashboard/total-announcements`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }
}
export const fetchTotalMessages = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/dashboard/total-messages`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }
}
export const fetchTotalTopics = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/dashboard/total-topics`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }
}