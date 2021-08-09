import React, { useState, useRef } from 'react';

import { connect } from 'react-redux'
import { POPUP_SHOW, PIZZA_COUNTER_ADD, PIZZA_COUNTER_REMOVE } from '../../actions/actions' 

import './Builder.css'

const Builder = ( { ingredients } ) => {

    const [ top, setTop ] = useState( '100px' );
    const [ left, setLeft ] = useState( '100px' );
    const ref = useRef(null)
    
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

   const flySomewhere = () => {
    let numTop = Math.floor(Math.random() * ref.current.clientHeight);
    setTop(`${numTop}px`)
    let numLeft = Math.floor(Math.random() * ref.current.clientWidth);
    setLeft(`${numLeft}px`);
   }

    return(
        <div className="builder" ref={ ref } > 
        <div className="pet" style={{ backgroundImage: "url('./img/pet.png')" }}></div>
            <div className="fly" style={{ top: top, left: left, backgroundImage: "url('./img/fly.png')" }} onMouseEnter={ flySomewhere } ></div>
            <div className="builder-container">
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