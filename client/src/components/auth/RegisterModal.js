import React from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink} from 'reactstrap';
import {useState} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { registerUser } from '../../redux/ducks/authUser';
import {useEffect} from 'react';
import { clear_errors } from '../../redux/ducks/error';
const RegisterModal=()=> {
    const [modal,setModal]= useState(false);
    const [user,setUser]= useState({name:'', email:'', password: ''});
    const [msg,setMsg]= useState(null);

    const isAuthenticated= useSelector((state)=> state.auth.isAuthenticated);
    const error= useSelector((state)=> state.error)
    const dispatch= useDispatch();

    const toggle=()=>{
        dispatch(clear_errors());
        setModal(!modal);

    }
    const handleChange=(e)=>{        
        setUser({
                ...user,
                [e.target.name]: e.target.value
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(registerUser(user));
    }

    useEffect(()=>{
        if(error.id==='REGISTER_FAILED'){
            setMsg(error.msg.msg) ;
        }
        else setMsg(null);

        if(isAuthenticated){
            if(modal) toggle();
        }

    },[error,isAuthenticated]) 

    return (
        <div>
            <NavLink
                onClick={toggle}
                href='#'
            >Register</NavLink> 

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    {msg? <Alert color="danger">{msg}</Alert>: null}
                    <Form  onSubmit= {handleSubmit}>
                        <FormGroup> 
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="email" placeholder="Name"  onChange={handleChange}  className="mb-3" />

                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email"  onChange={handleChange} className="mb-3" />

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"  onChange={handleChange}  className="mb-3"/>
                            <Button 
                                color="dark"
                                style={{marginTop:" 2rem"}}
                                block
                                type="submit"
                            >Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RegisterModal
