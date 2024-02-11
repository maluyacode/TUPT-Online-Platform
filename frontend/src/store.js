import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { uiReducer } from './reducers/uiReducers'
import { chatReducer } from './reducers/chatReducer'

const reducer = combineReducers({
    ui: uiReducer,
    chat: chatReducer
})

let initialState = {

}

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;