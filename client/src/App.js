import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import store from './store'

import AppNavbarComponent from './components/AppNavbar'
import ShoppingListComponent from './components/Shopping'
import ItemModal from './components/itemModal'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbarComponent />
        <Container>
          <ItemModal />
          <ShoppingListComponent />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
