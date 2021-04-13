import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {useState} from 'react';



const AppNavbar=() =>{

    const [isOpen,setIsOpen]=useState(false);
    const toggle=()=>{
        setIsOpen(!isOpen) ;                 
    }  
       
    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb5-5">
                <Container>
                    <NavbarBrand href='/'>Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/akshadagrawal"> Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container> 
            </Navbar>
        </div>
    )
}

export default AppNavbar
