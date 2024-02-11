import * as types from '../constants/chatConstants'
import axios from 'axios'

export const accessChat = (userID) => async (dispatch) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/chat/`, { userID }, {
        withCredentials: true
    })
    // console.log(data)
    dispatch({
        type: types.ACCESS_CHAT,
        payload: data
    })
}