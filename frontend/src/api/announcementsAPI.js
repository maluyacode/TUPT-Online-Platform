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

export const getSingleAnnouncement = async (id) => {

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

export const updateAnnouncement = async (values, id) => {

    try {

        const formData = new FormData;
        formData.append('title', values.title)
        formData.append('content', values.content)
        formData.append('groupViewers', values.groupViewers._id)
        formData.append('canViewBy', JSON.stringify(values.canViewBy))
        for (let i = 0; i < values.images.length; i++) {
            formData.append('images', values.images[i]);
        }
        for (let i = 0; i < values.files.length; i++) {
            formData.append('files', values.files[i]);
        }

        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/announcement/update/${id}`, formData, {
            withCredentials: true
        });

        return response;

    } catch ({ response }) {
        console.log(response)
        return response
    }

}