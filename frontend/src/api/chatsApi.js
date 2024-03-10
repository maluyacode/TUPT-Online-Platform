import axios from 'axios'


export const fetchAllChats = async () => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/chat/all`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }

}

export const fetchConversataion = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/chat/conversation/${id}`, {
            withCredentials: true
        });
        return response;
    } catch ({ response }) {
        console.log(response)
        return response
    }

}