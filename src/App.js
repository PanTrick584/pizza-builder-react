import React from 'react';
import Menu from './components/Menu'
import Builder from './components/Builder/Builder'
import Ingredients from './components/Ingredients/Ingredients'
import ingredientsItems from './ingredients-items'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer/reducer'

import './App.css';

const initialStore = {
  popupBuilder : 'flex',
  ingredients : ingredientsItems,
  pizzaCounter : 0,
  pizza: []
}
const store = createStore( reducer, initialStore );

console.log( store.getState() );


function App() {
  return (
   
      <div className="container">
       <Provider store={store}>
        <Menu />
        <Builder />
        <Ingredients />
        </Provider>
      </div>
    
  );
}

export default App;
