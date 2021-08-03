import React from 'react';

import { connect } from 'react-redux'
import { POPUP_SHOW, PIZZA_COUNTER_ADD, PIZZA_COUNTER_REMOVE } from '../../actions/actions' 

import './Builder.css'

const Builder = ( { popupShow, popupBuilder, close, pizzaCounterAdd, pizzaCounterRemove, pizzaCounter, ingredients } ) => {

    
    let pizzaAllIngredients = ingredients.map( ing => {
        let ingItems = ing.ingredients.map( ingItem => {
           let IngEl;
           if(ingItem.amount > 0 && ingItem.picture !== undefined ) {
            IngEl = <div className="builder-ingredient" key={ ingItem.name }>
                        <img className="builder-ingredient-img" src={ingItem.picture} alt={ ingItem.name } />
                    </div>
        }
           return IngEl;
       })
       return ingItems;
   })

    return(
        <div className="builder" style={{ backgroundImage: 'url(./img/pizza.png)' }}> 
            <div className="builder-container-itself">
                {[...pizzaAllIngredients]}
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {
        popupBuilder : store.popupBuilder,
        pizzaCounter : store.pizzaCounter,
        ingredients : store.ingredients,
        popupShow : store.popupShow
}
}
const mapDispatchToProps = dispatch => {
    return {
        close : () => dispatch( { type : POPUP_SHOW } ),
        pizzaCounterAdd : () => dispatch( { type : PIZZA_COUNTER_ADD } ),
        pizzaCounterRemove : () => dispatch( { type : PIZZA_COUNTER_REMOVE } )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Builder);