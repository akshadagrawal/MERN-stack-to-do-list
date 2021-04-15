import React from 'react'
import { NavLink } from 'reactstrap';
import { logoutUser } from '../../redux/ducks/authUser';
import {useDispatch} from 'react-redux';

function Logout() {
    const dispatch= useDispatch();

    return (
        <>
        <NavLink onClick={()=>dispatch(logoutUser())} href='#'>Logout</NavLink>
        </>
    )
}

export default Logout;
