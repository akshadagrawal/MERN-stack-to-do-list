import axios from 'axios';
import {  get_errors } from './error';
export const USER_LOADING ='USER_LOADING';
export const USER_LOADED ='USER_LOADED';
export const AUTH_ERROR ='AUTH_ERROR';
export const LOGIN_SUCCESS ='LOGIN_SUCCESS';
export const LOGIN_FAIL ='LOGIN_FAIL';
export const LOGOUT_SUCCESS ='LOGOUT_SUCCESS';
export const REGISTER_FAILED ='REGISTER_FAILED';
export const REGISTER_SUCCESS ='REGISTER_SUCCESS';


// dispatch means it dispatches the action of given type or anything can be also called as next()
//getState is equivalent to useSelector

const initialState= {
    token: localStorage.getItem('token'),
    isAuthenticated: null,   
    isLoading: null,
    user: null
}


//load user
export const loadUser = ()=> (dispatch,getState) =>{
   
    //User loading
    dispatch({ type: USER_LOADING});

  
    axios.get('/api/auth/user', tokenConfig(getState) )
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err=> {
                dispatch(get_errors(err.response.data, err.response.status))
                dispatch({
                    type: AUTH_ERROR,
                })
        })
    
}

//Register User
export const registerUser = ({name, email,password})=> dispatch=> {
   
    //headers
    const config= {
        headers:{
            "Content-type": "application/json"
        }
    }
    //Request body
    const body = JSON.stringify({name, email,password});

    axios.post('/api/users', body, config)
        .then(res=> {

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch( get_errors(err.response.data, err.response.status,'REGISTER_FAILED'))
            dispatch({
                type: REGISTER_FAILED,
            })
        })
}

//login user
export const loginUser = ({email,password})=> dispatch=> {
   
    //headers
    const config= {
        headers:{
            "Content-type": "application/json"
        }
    }
    //Request body
    const body = JSON.stringify({email,password});

    axios.post('/api/auth', body, config)
        .then(res=> {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch( get_errors(err.response.data, err.response.status,'LOGIN_FAILED'))
            dispatch({
                type: LOGIN_FAIL,
            })
        })
}

//Logout

export const logoutUser=()=>{
    return {
        type: LOGOUT_SUCCESS
    }
}



const authReducer= (state=initialState , action) =>{
    switch(action.type){

        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
             return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,

             }
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_FAILED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
               
            }
        default: 
            return state;
    }
}

//setup config/headers and token

export const tokenConfig=  getState=>{

    //get token from localStorage
    const token= getState().auth.token;

    //headers
    const config= {
        headers:{
            "Content-type": "application/json"
        }
    }

    //if token add to header
    if(token){
        config.headers['x-auth-token'] =token;
    }

    return config;

}

export default authReducer;