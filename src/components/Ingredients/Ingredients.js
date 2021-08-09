import React, { useCallback } from 'react';
import { connect } from 'react-redux'
import { useEffect } from 'react'

import { ADD_INGREDIENT, REMOVE_INGREDIENT, DELETE_INGREDIENT, COUNT_SINGLE_PRICE } from '../../actions/actions'

import './Ingredients.css'

const Ingredients = ( { popupShow, ingredients, pizzaCounter, addIngredient, removeIngredient, deleteIngredient, countSinglePrice } ) => {

    const ingredientsBox = useCallback(
        () => pizzaCounter >= 1 ? ingredients.map( ing => {
                if( ing.id === pizzaCounter ) {
                    let ingBox = ing.ingredients.map( (ingEl, id) => {
                        return <div key={id} className="ingredients-box">
                                    <img src={ingEl.picture} alt={ingEl.name} className="ingredients-box-img"/>
                                    <h3 className="ingredients-box-header">{ingEl.name}</h3>
                                    <div className="ingredients-box-elements">
                                        <p className="ingredients-box-amount">{ingEl.amount} x </p>
                                        <p className="ingredients-box-price"> {ingEl.price}</p>
                                        <p className="ingredients-box-totalPrice"> = {ingEl.totalPrice}</p>
                                    </div>
                                    <div className="ingredients-box-buttons">
                                        {ingEl.amount === undefined ? <button className="ingredients-box-button"></button> : <button className="ingredients-box-button" onClick={ () => { addIngredient( ing.name, ingEl.name ); countSinglePrice( ing.name, ingEl.name ) } } >+</button>}
                                        {ingEl.amount === undefined ? <button className="ingredients-box-button">WYBIERZ</button> : <button className="ingredients-box-button middle" onClick={ () => { removeIngredient( ing.name, ingEl.name ); countSinglePrice( ing.name, ingEl.name ) } }>-</button>}
                                        <button className="ingredients-box-button" onClick={ () => { deleteIngredient( ing.name, ingEl.name ); countSinglePrice( ing.name, ingEl.name ) }  }>x</button>
                                        
                                    </div>
                                </div>
                    } )
                    return ingBox;
                }
                return []
            }) : []
        , [pizzaCounter, ingredients, addIngredient, removeIngredient, deleteIngredient, countSinglePrice]
    )

    useEffect( () => {
        ingredientsBox()
    }, [pizzaCounter, ingredientsBox, ingredients] )

    return(
        <div className="ingredients" style={{ backgroundColor: popupShow ? 'var(--color-grey)' : 'var(--color-main)' }}>
            <div className="ingredients-container">
                {[...ingredientsBox()]}
            </div>
            <div className="ingredients-decoration"></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients,
        pizzaCounter : state.pizzaCounter,
        popupShow: state.popupShow
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient : ( sectionName, name ) => dispatch( { type : ADD_INGREDIENT, payload : { sectionName, name } } ),
        removeIngredient : ( sectionName, name ) => dispatch( { type : REMOVE_INGREDIENT, payload : { sectionName, name } } ),
        deleteIngredient : ( sectionName, name ) => dispatch( { type : DELETE_INGREDIENT, payload : { sectionName, name } } ),
        countSinglePrice : ( sectionName, name ) => dispatch( { type : COUNT_SINGLE_PRICE, payload : { sectionName, name } } )
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Ingredients);