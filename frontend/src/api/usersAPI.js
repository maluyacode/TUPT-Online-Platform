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
        formData.append('street', values.street)
        formData.append('baranggay', values.baranggay)
        formData.append('city', values.city)

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