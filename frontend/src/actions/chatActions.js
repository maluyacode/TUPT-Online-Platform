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

export const chatLists = () => async (dispatch) => {

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/chat/lists`, {
        withCredentials: true
    })

    dispatch({
        type: types.CHAT_LISTS,
        payload: data
    })
}

export const selectChat = (data) => async (dispatch) => {
    dispatch({
        type: types.SELECT_CHAT,
        payload: data
    })
    sessionStorage.setItem('selectedChat', JSON.stringify(data));
}