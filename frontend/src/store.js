import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { uiReducer } from './reducers/uiReducers'
import { chatReducer } from './reducers/chatReducer'

const reducer = combineReducers({
    ui: uiReducer,
    chat: chatReducer
})


const selectChat = sessionStorage.getItem('selectedChat') ? JSON.parse(sessionStorage.getItem('selectedChat')) : false

let initialState = {
    ui: {
        isSideBarCollapse: true,
        isChatSideBarOpen: false,
        openProfile: false
    },
    chat: {
        selectedChat: selectChat.id,
    }
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store;