import React from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_items } from '../redux/ducks/itemlist';


const ItemModal=()=> {
    const isAuthenticated=useSelector(state=> state.auth.isAuthenticated)


    const [modal,setModal]= useState(false);
    const [name,setName] = useState();
    const dispatch= useDispatch();

    const toggle=()=>{
        setModal(!modal);
    }
    const handleChange=(e)=>{
        setName(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(add_items(name));
        toggle();

    }
    return (
        <div> 
            {isAuthenticated ? (
                <Button
                color="dark"
                style={{marginBottom:"2rem", marginTop:"2rem"}}
                onClick={toggle}
            >Add Item</Button>

            ) :(
                <h4 className="mb-3 ml-4"  style={{marginBottom:"2rem", marginTop:"2rem"}} >Please Login to manage items</h4>
            )}
            

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add to shopping list</ModalHeader>
                <ModalBody>
                    <Form  onSubmit= {handleSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name="name" id="item" placeholder="Add Shopping Item"  onChange={handleChange} />
                            <Button 
                                color="dark"
                                style={{marginTop:" 2rem"}}
                                block
                                type="submit"
                            >Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ItemModal
