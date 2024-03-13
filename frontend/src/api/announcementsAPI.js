import axios from "axios";

export const getAnnouncements = async (filter = {}) => {

    let today = false
    if (filter.today) {
        today = true;
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/get-all?today=${today}`, {
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

export const getMyAnnouncements = async (id, fetchArchived) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/get-my-announcement/${id}?fetchArchived=${fetchArchived}`, {
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

        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }

        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/announcement/update/${id}`, formData, {
            withCredentials: true
        });

        return response;

    } catch ({ response }) {
        console.log(response)
        return response
    }

}

export const fetchTeachersPost = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/announcements-by-teacher/${id}`, {
            withCredentials: true
        });

        return response;

    } catch ({ response }) {
        console.log(response)
        return response
    }
}

export const fetchGroupPosts = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/announcement/announcements-by-group/${id}`, {
            withCredentials: true
        });

        return response;

    } catch ({ response }) {
        console.log(response)
        return response
    }

}

export const archiveAnnouncementApi = async (id) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/announcement/soft-delete/${id}`, {}, {
            withCredentials: true
        });

        return response;

    } catch ({ response }) {
        console.log(response)
        return response
    }
}

export const unArchiveAnnouncementApi = async (id) => {
    try {

        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/announcement/recover/${id}`, {}, {
            withCredentials: true
        });

        return response;

    } catch ({ response }) {
        console.log(response)
        return response
    }
}