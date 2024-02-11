import {
    OpenSideBar,
    CloseSideBar
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
    }
    return state
}