import Container from "./containers/Container";
import {ingredientsItems} from "./ingredients-items";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";

// import "./App.css";

const initialStore = {
    popupShow: true,
    ingredients: ingredientsItems,
    ingredientIndex: 0,
    excludedIndexes: [2, 3, 4, 9, 14],
    pizzaCounter: 0,
    pizzaAllIngredients: [],
    pizzaUniqueIngredients: [],
    pizzaPrice: 0,
    pizzaIngGroupsPrice: []
};
const store = createStore(reducer, initialStore);

function App() {
    return (
        <Provider store={store}>
            <Container />
        </Provider>
    );
}

export default App;
