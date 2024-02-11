import {
    OpenSideBar,
    CloseSideBar
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