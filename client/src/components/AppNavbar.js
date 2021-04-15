import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import {useState} from 'react';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { useSelector } from 'react-redux';


const AppNavbar=() =>{

    const {isAuthenticated, user}= useSelector(state=> state.auth )


    const [isOpen,setIsOpen]=useState(false);
    const toggle=()=>{
        setIsOpen(!isOpen) ;                 
    }  

    const guestlinks=(
        <>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
         </>
                            
    );
    const authLinks=(
        <>
        <NavItem>
            <span className="navbar-text mr-3"> 
                <strong> {user && 'Welcome ' + user.name +'!' }</strong>
            </span>
        </NavItem>
            <NavItem>
                <Logout/>
            </NavItem>
        </>
    )

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb5-5">
                <Container>
                    <NavbarBrand href='/'>Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                           {isAuthenticated? authLinks : guestlinks} 
                        </Nav>
                    </Collapse>
                </Container> 
            </Navbar>
        </div>
    )
}

export default AppNavbar
