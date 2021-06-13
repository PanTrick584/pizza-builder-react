import React from 'react';

import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { POPUP_SHOW, PIZZA_COUNTER_ADD, PIZZA_COUNTER_REMOVE } from '../../actions/actions' 

import BuilderPopup from './BuilderPopup'

import './Builder.css'

const Builder = ( { popupShow, popupBuilder, close, pizzaCounterAdd, pizzaCounterRemove, pizzaCounter, ingredients } ) => {

    let next = pizzaCounter < ingredients.length ? 'następne' : 'kończymy?';

    let pizzaSectionIngredients = ingredients.map( ing => {
         let ingItems = ing.ingredients.map( ingItem => {
            let IngEl;
            if ( ing.id === pizzaCounter ) {

                if(ingItem.amount > 0 && ingItem.picture !== undefined ) {
                    return IngEl = <div className="builder-ingredient" key={ ingItem.name }>{ingItem.name}
                                <img className="builder-section-img" src={ingItem.picture} alt={ ingItem.name } />
                            </div>
                }
            return IngEl;
             }
            return IngEl;
        })
        return ingItems;
    })

    let pizzaSectionPrice = ingredients
                            .filter( ing => ing.id === pizzaCounter )
                            .map( ingSection => {
                               return ingSection.ingredients.map( ingItem => {
                                   return ingItem.totalPrice
                               } ).reduce( (num, sum) => { return sum + num }, 0 )
                            } )


    console.log(pizzaSectionPrice)
    
    let pizzaAllIngredients = ingredients.map( ing => {
        let ingItems = ing.ingredients.map( ingItem => {
           let IngEl;
           if(ingItem.amount > 0 && ingItem.picture !== undefined ) {
            IngEl = <div className="builder-ingredient" key={ ingItem.name }>{ingItem.name}<img className="builder-ingredient-img" src={ingItem.picture} alt={ ingItem.name } /></div>
        }
           return IngEl;
       })
       return ingItems;
   })

    return(
        <div className="builder"> 
            <CSSTransition  in={ popupShow } timeout={ { exit: 1000, appear: 2000 } } classNames={'builder-popup'} appear={true} unmountOnExit >
                <BuilderPopup /> 
            </CSSTransition>
            {console.log(popupShow)}
            <div className="builder-container">
                <div className="builder-container-ingredients">
                    {[...pizzaSectionIngredients]}
                    <div className="builder-section-info">
                        <h4 className="builder-section-title">cena składników <br /> z sekcji:</h4>
                        <p className="builder-section-price">{parseFloat(pizzaSectionPrice).toFixed(2)}</p>
                    </div>
                </div>
                <div className="builder-container-itself"> {[...pizzaAllIngredients]}</div>
            </div>
            <div className="builder-info">
                <div className="builder-info-box">
                    <p>Wybierz składniki, a następnie wciśnij DALEJ, by przejść do następnej grupy składników</p>
                    <p>Zawsze możesz wrócić i zmienić podjęte wybory, wystarczy, że wciśniesz odpowiednią grupę skąłdników</p>
                </div>
                <div className="builder-info-box">
                    <button className="builder-button-navigation" onClick={ () => pizzaCounterRemove()}>Poprzednie</button>
                    <button className="builder-button-navigation" onClick={ () => pizzaCounterAdd()}>{next}</button>
                </div>
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