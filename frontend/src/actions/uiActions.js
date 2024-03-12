import axios from 'axios'
import {
    OpenSideBar,
    CloseSideBar,
    OpenChatSideBar,
    CloseChatSideBar,
    OpenProfile,
    CloseProfile
} from '../constants/uiConstants'
import { getSingleUser } from '../api/usersAPI'

export const openSideBar = () => async (dispatch) => {
    dispatch({
        type: OpenSideBar
    })
}

export const closeSideBar = () => async (dispatch) => {
    dispatch({
        type: CloseSideBar
    })
}

export const openChatSideBar = () => async (dispatch) => {
    dispatch({
        type: OpenChatSideBar
    })
}

export const closeChatSideBar = () => async (dispatch) => {
    dispatch({
        type: CloseChatSideBar
    })
}

export const openProfile = (userID) => async (dispatch) => {

    const { data } = await getSingleUser(userID);

    dispatch({
        type: OpenProfile,
        payload: data
    })
}

export const closeProfile = () => async (dispatch) => {
    dispatch({
        type: CloseProfile,
    })
}