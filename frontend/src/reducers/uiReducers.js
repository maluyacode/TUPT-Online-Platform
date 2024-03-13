import {
    OpenSideBar,
    CloseSideBar,
    OpenChatSideBar,
    CloseChatSideBar,
    OpenProfile,
    CloseProfile,
    OpenDoc,
    CloseDoc
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
        case OpenProfile:
            return {
                ...state,
                openProfile: true,
                user: action.payload
            }
        case CloseProfile:
            return {
                ...state,
                openProfile: false,
                // userId: action.payload.id
            }
        case OpenDoc:
            return {
                ...state,
                openPreview: true,
                attachment: action.payload
            }
        case CloseDoc:
            return {
                ...state,
                openPreview: false,
                // userId: action.payload.id
            }
    }
    return state
}