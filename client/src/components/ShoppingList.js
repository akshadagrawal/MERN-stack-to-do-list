import React from 'react';
import {Button, Container, ListGroup, ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { delete_items, get_items } from '../redux/ducks/itemlist';

const ShoppingList=() =>{

    const dispatch = useDispatch();

    const items= useSelector((state)=> state.item.items);

    useEffect(()=>{
        dispatch(get_items());
    },[dispatch])  

    const handleDeleteItem = (id)=>{
            dispatch(delete_items(id))                           
    }
  
   
    return (
        <div>
            <Container>
                <ListGroup >
                    <TransitionGroup className="shopping-list">
                        {items && items.map(({_id,name})=>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                            className="remove-btn" 
                                            color="danger" 
                                            size="sm" 
                                            onClick={()=>handleDeleteItem(_id)} 
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))} 
                    </TransitionGroup>
                </ListGroup>
            </Container>
        </div>
    )
}

export default ShoppingList
