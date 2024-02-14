import * as types from '../constants/chatConstants'

export const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case types.ACCESS_CHAT:
            return {
                ...state,
                messages: action.payload.messages,
                chatInfo: action.payload.chat,
            }
        case types.CHAT_LISTS:
            return {
                ...state,
                chatLists: action.payload.chats,
            }
        case types.SELECT_CHAT:
            return {
                ...state,
                selectedChat: action.payload.id,
            }
    }
    return state
}
