import axios from 'axios';
import { tokenConfig } from './authUser';
import { get_errors } from './error';
export const GET_ITEMS='get_items';
export const SET_ITEMS=' set_items';
export const ADD_ITEMS='add_items';
export const DELETE_ITEMS='delete_items';

const initialState= {
    items: []  
};


// dispatch means it dispatches the action of given type



export  const get_items=()=> dispatch =>{
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err=>{
            dispatch(get_errors(err.response.data, err.response.status));
        })
 }
 
export  const add_items=(name)=> (dispatch, getState) =>{
    axios.post('/api/items', {name}, tokenConfig(getState))
        .then(res=> dispatch({
            type:ADD_ITEMS,
            payload: res.data
        }))
        .catch(err=>{
            dispatch(get_errors(err.response.data, err.response.status));
        })
}
export  const delete_items=(id)=>(dispatch,getState)=>{
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res=> dispatch({
            type:DELETE_ITEMS,
            payload: id
        }))
        .catch(err=>{
            dispatch(get_errors(err.response.data, err.response.status));
        })
}


const itemReducer= (state= initialState, action)=>{
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
            } ;
        case ADD_ITEMS:
            return{
                ...state,
                items : [action.payload, ...state.items] 
            };
        case DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(item=> item._id!== action.payload)
            } ;
        default :
         return state;
    }
}

export default itemReducer;