import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import './App.css'
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {loadUser} from './redux/ducks/authUser';



function App() {

  const dispatch= useDispatch();
  
    useEffect(()=>{
      dispatch(loadUser());
      })  ;

  return (
    <div className="App">
      <AppNavbar/>
      <Container>
        <ItemModal/>
        <ShoppingList/>
      </Container>
     
    </div>
  );
}

export default App;  
