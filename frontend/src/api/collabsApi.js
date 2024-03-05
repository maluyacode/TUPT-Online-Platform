import axios from "axios";

export const createPost = async (values) => {

    try {

        const formData = new FormData;
        formData.append('heading', values.heading)
        formData.append('body', values.body)
        formData.append('category', JSON.stringify(values.category))
        for (let i = 0; i < values.images.length; i++) {
            formData.append('images', values.images[i]);
        }
        for (let i = 0; i < values.attachments.length; i++) {
            formData.append('attachments', values.attachments[i]);
        }

        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/collab/create/post`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}

export const updatePostApi = async (id, values) => {

    try {

        const formData = new FormData;
        formData.append('heading', values.heading)
        formData.append('body', values.body)
        formData.append('category', JSON.stringify(values.category))

        for (let i = 0; i < values.images.length; i++) {
            formData.append('images', values.images[i]);
        }
        for (let i = 0; i < values.attachments.length; i++) {
            formData.append('attachments', values.attachments[i]);
        }

        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/collab/update-post/${id}`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}

export const fetchAllPost = async (fetchStatus) => {

    try {

        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/collab/get-all?fetchStatus=${fetchStatus}`, {
            withCredentials: true,
        });

        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}

export const fetchSinglePost = async (id) => {

    try {

        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/collab/get-single/${id}`, {
            withCredentials: true,
        });

        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}

export const deleteTopic = async (id) => {
    try {

        const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/collab/delete/${id}`, {
            withCredentials: true,
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export const destroyTopic = async (id) => {
    try {

        const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/collab/destroy/${id}`, {
            withCredentials: true,
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}