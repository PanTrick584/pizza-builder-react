import { 
    PIZZA_COUNTER_ADD,
    PIZZA_COUNTER_REMOVE,
    PIZZA_COUNTER_SET, 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT,
    DELETE_INGREDIENT,
    POPUP_SHOW
} from '../actions/actions'

// FIND ONLY UNIQUE INGREDIENTS FROM ADDED TO PIZZA
const findUniqueIngredients = (allIngredients, singleIngredientAmount, ingredientName) => {
   let uniqueIngredients = [...new Map(allIngredients.map(item => [item['name'], item])).values()]
        allIngredients.map( ingredient => ingredient.name === ingredientName && (ingredient.amount = singleIngredientAmount))
   return uniqueIngredients
}
// FIND INGREDIENT TYPE AND ALL ITS DUPLICATES FROM CURRENT PIZZA INGREDIENTS AND CHECK LENGTH: NUMBER
const findSingleIngredientAmount = (allIngredients, ingredientName) => allIngredients.filter( ({name}) => name === ingredientName).length
// FIND OUT WHAT IS CURRENT PRICE OF PIZZA
const fintCurrentPizzaPrice = allIngredients => allIngredients.reduce(( num, {price} ) => num + price, 0)


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
        const setName = action.payload.sectionName
        const ingredientName = action.payload.name
        const index = state.ingredientIndex
        const excluded = state.excludedIndexes
        const end = state.excludedIndexes.length < 24 ? true : false

        let randomNumber;
        if(end) {
            do {
                randomNumber =  Math.floor(Math.random() *( 24 - 0 + 1))
            } while (excluded.includes(randomNumber))
        }

        // FIND CLICKED INGEDIENT
        const selectedIngredient = [...state.ingredients]
                                        .find( ingredientSec => ingredientSec.name === setName).ingredients
                                        .map( ({name, price, picture}) => name === ingredientName && ({setName, name, picture, price}))
                                        .filter( ing => ing)
                                        .reduce( (acc, {name, price, picture, setName}) => acc = {name, setName, price, picture, id: index, randomid: randomNumber}, {})
        //  CURRENT ALL ADDED INGREDIENTS 
        let currentPizzaAllIngredients = [...state.pizzaAllIngredients, selectedIngredient];
        
        const singleIngredientAmount = findSingleIngredientAmount(currentPizzaAllIngredients, ingredientName)
        const uniquePizzaIngredients = findUniqueIngredients(currentPizzaAllIngredients,  singleIngredientAmount, ingredientName)

        // FIND OUT WHAT IS CURRENT PRICE OF INGREDIENTS GROUP
        let currentIngGroupPrice = currentPizzaAllIngredients.filter( set => set.setName === setName)
                                                        .reduce(( num, {price} ) => num + price, 0)

        let currentSet = {setName, price: parseFloat(currentIngGroupPrice).toFixed(1), ingredient: ingredientName}

        let filterSetPrice = [...state.pizzaIngGroupsPrice].length > 0 
                                ? [...state.pizzaIngGroupsPrice].filter( set => set.setName !== setName)
                                : [];

       return { ...state, 
                endingredientIndex: state.ingredientIndex +1,
                excludedIndexes: end ? [...state.excludedIndexes, randomNumber] : state.excludedIndexes,
                pizzaAllIngredients: currentPizzaAllIngredients,
                pizzaUniqueIngredients: uniquePizzaIngredients,
                pizzaPrice: fintCurrentPizzaPrice(currentPizzaAllIngredients),
                pizzaIngGroupsPrice: [...filterSetPrice, currentSet] }
    }

    if( action.type === REMOVE_INGREDIENT ) {
        const ingredientName = action.payload.name
        const setName = action.payload.sectionName
        const allPizzaIngredients = state.pizzaAllIngredients
        const excluded = state.excludedIndexes

        const removedIngredient = allPizzaIngredients.find( ({name}) => name === ingredientName)
        const indexOfIngredient = allPizzaIngredients.indexOf(removedIngredient)
        const filteredAllPizzaIngredients = allPizzaIngredients.filter((_, id) => id !== indexOfIngredient)

        const singleIngredientAmount = findSingleIngredientAmount(filteredAllPizzaIngredients, ingredientName) 
        const uniquePizzaIngredients = findUniqueIngredients(filteredAllPizzaIngredients)
              uniquePizzaIngredients.map( ingredient => ingredient.name === ingredientName && (ingredient.amount = singleIngredientAmount))


        let currentIngGroupPrice = filteredAllPizzaIngredients.filter( set => set.setName === setName)
                                                        .reduce(( num, {price} ) => num + price, 0)

        let currentSet = {setName, price: parseFloat(currentIngGroupPrice).toFixed(1), ingredient: ingredientName}

        let filterSetPrice = [...state.pizzaIngGroupsPrice].length > 0 
                                ? [...state.pizzaIngGroupsPrice].filter( set => set.setName !== setName)
                                : [];

        const newExcluded = removedIngredient && excluded.filter( num => num !== removedIngredient.randomid)

        return {...state,
                excludedIndexes: removedIngredient ? newExcluded : state.excludedIndexes,
                pizzaAllIngredients: filteredAllPizzaIngredients,
                pizzaUniqueIngredients: uniquePizzaIngredients,
                pizzaPrice: fintCurrentPizzaPrice(filteredAllPizzaIngredients),
                pizzaIngGroupsPrice: [...filterSetPrice, currentSet]
        }
    }

    if( action.type === DELETE_INGREDIENT ) {
        const ingredientName = action.payload.name
        const groupName = action.payload.sectionName
        const allPizzaIngredients = state.pizzaAllIngredients
        const excluded = state.excludedIndexes
        const unique = state.pizzaUniqueIngredients
        const groupPrice = state.pizzaIngGroupsPrice

        const deleteIngredients = allPizzaIngredients.filter( ({name}) => name === ingredientName)
        const deleteIngredientsPrice = deleteIngredients.map( ({price}) => price).reduce((num, sum) => num + sum, 0)
        const deleteIngredientRandomID = deleteIngredients.map(({randomid}) => randomid)
        const filteredExcluded = excluded.filter( num => !deleteIngredientRandomID.includes(num));
        const filteredIngredients = allPizzaIngredients.filter( ing => !deleteIngredients.includes(ing) )
        const filteredUnique = unique.filter( ({name}) => name !== ingredientName)
        const filteredGroupPrice = groupPrice.map( ({setName, price, ingredient}) => setName === groupName && {setName, price: price - deleteIngredientsPrice, ingredient})
        
        return {...state, 
                pizzaAllIngredients: filteredIngredients,
                pizzaPrice: state.pizzaPrice - deleteIngredientsPrice,
                excludedIndexes: filteredExcluded,
                pizzaUniqueIngredients: filteredUnique,
                pizzaIngGroupsPrice: filteredGroupPrice
        }
    }

    return state;
}

export default reducer;