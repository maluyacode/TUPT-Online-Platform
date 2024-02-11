import * as types from '../constants/chatConstants'

export const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ACCESS_CHAT:
            return {
                ...state,
                messages: action.payload.messages,
                chatInfo: action.payload.chat,
            }
    }
    return state
}
