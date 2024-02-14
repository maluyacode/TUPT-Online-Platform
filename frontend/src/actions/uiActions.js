import {
    OpenSideBar,
    CloseSideBar,
    OpenChatSideBar,
    CloseChatSideBar
} from '../constants/uiConstants'

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