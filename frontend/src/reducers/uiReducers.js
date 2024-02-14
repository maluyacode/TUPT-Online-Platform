import {
    OpenSideBar,
    CloseSideBar,
    OpenChatSideBar,
    CloseChatSideBar
} from '../constants/uiConstants'

export const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case OpenSideBar:
            return {
                ...state,
                isSideBarCollapse: true
            }
        case CloseSideBar:
            return {
                ...state,
                isSideBarCollapse: false
            }
        case OpenChatSideBar:
            return {
                ...state,
                isChatSideBarOpen: false
            }
        case CloseChatSideBar:
            return {
                ...state,
                isChatSideBarOpen: true
            }
    }
    return state
}