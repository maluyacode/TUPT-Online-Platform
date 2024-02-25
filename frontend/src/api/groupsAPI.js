import axios from 'axios'
import { getUser } from '../utils/helper'

export const getOwnedGroups = async () => {
    try {

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/group/get-all?owner=${getUser()._id}`, {
            withCredentials: true,
        })

        data.groups.unshift({
            groupName: 'Announce to all people',
            _id: 'all'
        })

        return data.groups

    } catch (err) {
        console.log(err)

    }
}