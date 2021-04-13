import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import itemReducer from './ducks/itemlist';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer= combineReducers({
    item: itemReducer
})

const middleware=[ thunk];
const store= createStore(rootReducer,{},composeWithDevTools( applyMiddleware(...middleware)) );


export default store; 