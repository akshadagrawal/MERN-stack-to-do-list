import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import itemReducer from './ducks/itemlist';
import errorReducer from './ducks/error';
import authReducer from "./ducks/authUser";
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer= combineReducers({
    item: itemReducer,
    auth: authReducer,
    error: errorReducer
})

const middleware=[ thunk];
const store= createStore(rootReducer,{},composeWithDevTools( applyMiddleware(...middleware)) );


export default store; 