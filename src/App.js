import React from 'react';

import Container from './components/Container'
import ingredientsItems from './ingredients-items'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer/reducer'

import './App.css';

const initialStore = {
  popupShow: true,
  ingredients : ingredientsItems,
  pizzaCounter : 0
}
const store = createStore( reducer, initialStore );

function App() {

  return (
       <Provider store={store}>
          <Container />
        </Provider>    
  );
}

export default App;
