import { 
    PIZZA_COUNTER_ADD,
    PIZZA_COUNTER_REMOVE,
    PIZZA_COUNTER_SET, 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT,
    DELETE_INGREDIENT,
    COUNT_SINGLE_PRICE,
    POPUP_SHOW
} from '../actions/actions'

function reducer ( state, action ) {
    if( action.type === POPUP_SHOW ) {
        return { ...state, popupShow: false }
    }
    if( action.type === PIZZA_COUNTER_ADD ) {
        if( state.pizzaCounter < state.ingredients.length ) {
            return { ...state, pizzaCounter: state.pizzaCounter + 1 }
        }
        return state;
    }
    if( action.type === PIZZA_COUNTER_REMOVE ) {
        if( state.pizzaCounter > 1 ) {
            return { ...state, pizzaCounter: state.pizzaCounter - 1 }
        }
        return state;
    }
    if( action.type === PIZZA_COUNTER_SET ) {
            return { ...state, pizzaCounter: action.payload.id }
    }
    if( action.type === ADD_INGREDIENT ) {
       let tempIngredients = state.ingredients.map( ing => {
           let tempIng = ing.ingredients.map( ingItem => {
               let { name, amount } = ingItem;
               if(name === action.payload.name) {
                   ingItem = {...ingItem, amount : amount + 1}
               }
               return {...ingItem};
           } )
           return {...ing, ingredients : tempIng} ;
       } )
       return {...state, ingredients : tempIngredients }
    }
    if( action.type === REMOVE_INGREDIENT ) {
        let tempIngredients = state.ingredients.map( ing => {
            let tempIng = ing.ingredients.map( ingItem => {
                let { name, amount } = ingItem;
                if(name === action.payload.name && amount >= 1) {
                    ingItem = {...ingItem, amount : ingItem.amount - 1}
                }
                return {...ingItem};
            } )
            return {...ing, ingredients : tempIng} ;
        } )
        return {...state, ingredients : tempIngredients }
    }
    if( action.type === DELETE_INGREDIENT ) {
        let tempIngredients = state.ingredients.map( ing => {
            let tempIng = ing.ingredients.map( ingItem => {
                let { name } = ingItem;
                if(name === action.payload.name) {
                    ingItem = {...ingItem, amount : 0 }
                }
                return {...ingItem};
            } )
            return {...ing, ingredients : tempIng} ;
        } )
        return {...state, ingredients : tempIngredients }
    }
    if( action.type === COUNT_SINGLE_PRICE ) {
        let tempIngredients = state.ingredients.map( ing => {
            let tempIng = ing.ingredients.map( ingItem => {
                let { name, amount, price } = ingItem;
                if(name === action.payload.name) {
                    ingItem = {...ingItem, totalPrice : parseFloat((amount * price).toFixed(2))}
                }
                return {...ingItem};
            } )
            return {...ing, ingredients : tempIng} ;
        } )
        return {...state, ingredients : tempIngredients }
    }
    return state;
}

export default reducer;