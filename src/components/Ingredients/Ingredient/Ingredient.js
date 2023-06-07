import React from 'react'
import { connect } from 'react-redux'

import { ADD_INGREDIENT, REMOVE_INGREDIENT, DELETE_INGREDIENT } from '../../../actions/actions'

const SingleIngredient = ({id, ingPicture, ingName, groupName, ingPrice, ingredientAmount, addIngredient, removeIngredient, deleteIngredient}) => {
    return (
        <div key={id} className="ingredient">
                <div className="ingredient-box ingredient-box-1">
                    <img src={ingPicture} alt={ingName} className="ingredient-box-img"/>
                    <div className="ingredient-box-amount">
                        {ingredientAmount}
                    </div>
                    <div className="ingredient-box-header">
                        <h3 className="ingredient-box-header-title">{ingName}</h3>
                        <p className="ingredient-box-header-price"> {ingPrice}</p>
                    </div>
                </div>
                <div className="ingredient-box ingredient-box-2">
                    <div className="ingredient-box-buttons">
                        <button className="ingredient-box-buttons-single button-add" 
                                onClick={() => {addIngredient( groupName, ingName )}} >DODAJ</button>
                        <button  className={`ingredient-box-buttons-single button-remove ${ingredientAmount === 0 && "button-disabled"}`} 
                                onClick={() => {ingredientAmount > 0 && removeIngredient( groupName, ingName )}}>ODEJMIJ</button>
                        <button className={`ingredient-box-buttons-single button-delete ${ingredientAmount <= 3 && "button-disabled"}`} 
                                onClick={() => {ingredientAmount >= 3 && deleteIngredient( groupName, ingName )}}>USUŃ</button>
                    </div>
                </div>
            </div>
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
        deleteIngredient : ( sectionName, name ) => dispatch( { type : DELETE_INGREDIENT, payload : { sectionName, name } } )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SingleIngredient);