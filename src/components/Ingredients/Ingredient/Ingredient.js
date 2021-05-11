import React from 'react'
import { connect } from 'react-redux'

import { ADD_INGREDIENT, REMOVE_INGREDIENT, DELETE_INGREDIENT, COUNT_SINGLE_PRICE } from '../../../actions/actions'


const Ingredient = () => {
    return(
            <div></div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients,
        pizzaCounter : state.pizzaCounter
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

export default connect(mapStateToProps, mapDispatchToProps) (Ingredient);