import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'

import { PIZZA_COUNTER_SET } from '../actions/actions'

import Popup from './Popup/BuilderPopup'

import './Menu.css'

const Menu = ( { popupShow, ingredients, pizzaCounter, renderIngredients } ) => {

   

    const menu = useCallback(() => pizzaCounter >= 1  ? ingredients.map( (ing, id) => {
            let highlightClass = pizzaCounter === id + 1 ? 'menu-highlight' : ''
            return <li 
            className={ highlightClass } 
            key={ing.id} 
            onClick={ ()=> renderIngredients( id +1 ) } >
            {ing.name}
            <p className="builder-section-price">{parseFloat(pizzaSectionPrice[id]).toFixed(2)}</p>
            </li>
    } ) : [], [ingredients, pizzaCounter, renderIngredients])

    useEffect( () => {
        menu()
    }, [pizzaCounter, menu] )

    let pizzaSectionPrice = ingredients.map( ingSection => {
                               return ingSection.ingredients.map( ingItem => {
                                   return ingItem.totalPrice
                               } ).reduce( (num, sum) => { return sum + num }, 0 )
                            } )
    let pizzaPrice = ingredients.map( ingSection => {
                               return ingSection.ingredients.map( ingItem => {
                                   return ingItem.totalPrice
                               } ).reduce( (num, sum) => { return sum + num }, 0 )
                            } ).reduce( (num, sum) => {return sum + num}, 0 )
                            console.log( pizzaPrice )
    
    return(
        <div className="menu">
            <Popup />
            <h3 className="menu-h3">Najlepszej jakości składniki:</h3>
            <nav className="menu-nav" >                
                <ul className="menu-nav-ul">
                    {[...menu()]}
                </ul>
            </nav>
            <h3 className="menu-h3" >Razem: <span>{pizzaPrice}</span></h3>
            {popupShow ? null : <button className="builder-popup-box-button menu-btn">Zamów!</button>}
        </div>
    )
}
const mapStateToProps = store => {
    return { 
        ingredients : store.ingredients,
        pizzaCounter : store.pizzaCounter,
        popupShow: store.popupShow
    }
}
const mapDispatchToProps = dispatch => {
    return {
        renderIngredients : ( id ) => dispatch( {type : PIZZA_COUNTER_SET, payload : { id } })
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Menu);