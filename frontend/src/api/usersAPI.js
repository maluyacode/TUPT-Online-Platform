import axios from "axios";

export const getAllTeachers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/lists?role=teacher`, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export const getSingleUser = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/profile/${id}`, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/lists`, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export const updateProfile = async (values, id) => {

    try {

        const formData = new FormData;
        formData.append('firstname', values.firstname)
        formData.append('lastname', values.lastname)
        formData.append('contact_number', values.contact_number)
        formData.append('email', values.email)
        formData.append('birthdate', new Date(values.birthdate))
        formData.append('facebookLink', values.facebookLink)
        formData.append('instagramLink', values.instagramLink)
        formData.append('houseNo', values.houseNo)
        formData.append('role', values.role)
        formData.append('street', values.street)
        formData.append('baranggay', values.baranggay)
        formData.append('city', values.city)
        formData.append('whosEditing', values.whosEditing)

        if (values.role === 'student') {
            formData.append('course', values.course)
            formData.append('department', null)
            formData.append('iCareFor', [])
        }

        if (values.role === 'teacher') {
            formData.append('department', values.department)
            formData.append('iCareFor', [])
            formData.append('course', null)
        }

        if (values.role === 'parent') {
            formData.append('course', null)
            formData.append('department', null)
            formData.append('iCareFor', JSON.stringify(values.iCareFor))
        }

        if (values.avatar?.length > 0) {
            formData.append('avatar', values.avatar[0]);
        }

        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/user/update/${id}`, formData, {
            withCredentials: true
        });
        console.log(response)
        return response
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
    } catch ({ response }) {
        return response
    }

}

export const logout = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/logout`, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export const sendEmailToUsers = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/send-email`, formData, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
}

export const sendSMSToUsers = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/send-sms`, formData, {
            withCredentials: true
        });
        return response

    } catch ({ response }) {
        console.log(response);
        return response
    }
} 