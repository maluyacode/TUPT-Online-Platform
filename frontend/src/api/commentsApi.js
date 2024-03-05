import axios from "axios";

export const createCommentApi = async (values) => {
    // console.log(values)
    try {

        const files = values.files;
        let attachments = [];
        let images = [];

        for (let i = 0; i < files.length; i++) {
            if (files[i].type && files[i].type.includes('image')) {
                images.push(files[i]);
            } else {
                attachments.push(files[i]);
            }
        }

        const formData = new FormData;

        if (values.replyTo) {
            formData.append('repliedTo', values.replyTo)
        }
        formData.append('textContent', values.textContent)
        formData.append('forumId', values.selectedPost)

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        for (let i = 0; i < attachments.length; i++) {
            formData.append('attachments', attachments[i]);
        }

        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/comment/create`, formData, {
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

export const deleteCommentApi = async (id) => {

    try {

        const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/comment/delete/${id}`, {
            withCredentials: true,
        });

        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}

export const editCommentApi = async (id, values) => {
    try {

        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/comment/edit/${id}`, values, {
            withCredentials: true,
        });

        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}

export const deleteCommentedFileApi = async (id, publicId) => {
    try {

        const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/comment/delete/attached/${id}?publicId=${publicId}`, {
            withCredentials: true,
        });

        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }

}