export const CLEAR_ERRORS ='CLEAR_ERRORS';
export const GET_ERRORS ='GET_ERRORS';

const initialState= {
    msg:{},
    status:null,
    id:null
}

export const get_errors=(msg, status, id= null)=>{
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}
export const clear_errors=()=>{
    return {
        type: CLEAR_ERRORS
    }
}


const errorReducer= (state=initialState , action) =>{
    switch(action.type){
        case GET_ERRORS:
                return{
                    msg: action.payload.msg,
                    status: action.payload.status,
                    id: action.payload.id
                }
        case CLEAR_ERRORS:
            return{
                msg:{},
                status:null,
                id:null
            }
        default: 
            return state;
    }
}

export default errorReducer;