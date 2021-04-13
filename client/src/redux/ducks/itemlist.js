import axios from 'axios';
export const GET_ITEMS='get_items';
export const SET_ITEMS=' set_items';
export const ADD_ITEMS='add_items';
export const DELETE_ITEMS='delete_items';


export  const get_items=()=> dispatch =>{
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
 }
 
export  const add_items=(name)=> dispatch =>{
    axios.post('/api/items', {name})
        .then(res=> dispatch({
            type:ADD_ITEMS,
            payload: res.data
        }))
}
export  const delete_items=(id)=>dispatch=>{
    axios.delete(`/api/items/${id}`)
        .then(res=> dispatch({
            type:DELETE_ITEMS,
            payload: id
        }))
}

const initialState= {
    items: []  
};

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