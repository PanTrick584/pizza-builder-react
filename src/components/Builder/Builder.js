import React from 'react';
import { connect } from 'react-redux'
import { POPUP_BUILDER, PIZZA_COUNTER_ADD, PIZZA_COUNTER_REMOVE } from '../../actions/actions' 

import './Builder.css'

const Builder = ( { popupBuilder, close, pizzaCounterAdd, pizzaCounterRemove, pizzaCounter, ingredients } ) => {

    let next = pizzaCounter < ingredients.length ? 'następne' : 'kończymy?';


    let pizzaBuilder = ingredients.map( ing => {
         let ingItems = ing.ingredients.map( ingItem => {
             console.log( pizzaCounter, ing.id )
             let IngEl;
             if ( ing.id === pizzaCounter ) {

            if(ingItem.amount > 0 ) {
                IngEl = <div key={ ingItem.name }>{ingItem.name}</div>
            }
            return IngEl;
             }
            return IngEl;
        })
        return ingItems;
    })

    return(
        <div className="builder"> 
           <div className="builer-popup" style={{display: popupBuilder}}>
                    <div className="builder-popup-box">
                        <h1 className="builder-popup-box-header">Witaj! Swórz swoją własną pizze!</h1>
                        <button className="builder-popup-box-button" onClick={ ()=> { close(); pizzaCounterAdd() } }>Zaczynamy!</button>
                    </div>
            </div>
            <div className="builder-container">
                <div>
                    {[...pizzaBuilder]}
                </div>
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
        ingredients : store.ingredients
}
}
const mapDispatchToProps = dispatch => {
    return {
        close : () => dispatch( { type : POPUP_BUILDER } ),
        pizzaCounterAdd : () => dispatch( { type : PIZZA_COUNTER_ADD } ),
        pizzaCounterRemove : () => dispatch( { type : PIZZA_COUNTER_REMOVE } )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Builder);