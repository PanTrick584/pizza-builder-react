import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'

import { PIZZA_COUNTER_SET, PIZZA_COUNTER_ADD, POPUP_SHOW } from '../actions/actions'

import './Menu.css'

const Menu = ( { popupShow, ingredients, pizzaCounter, renderIngredients, pizzaCounterAdd, close } ) => {

    const [ end, setEnd ] = useState( false );

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

    const menu = useCallback(() => pizzaCounter >= 1  ? ingredients.map( (ing, id) => {
            let highlightClass = pizzaCounter === id + 1 ? 'menu-highlight' : ''
            return <li 
            className={ highlightClass } 
            key={ing.id} 
            onClick={ ()=> renderIngredients( id +1 ) } >
            {ing.name}
            <p>{parseFloat(pizzaSectionPrice[id]).toFixed(2)}</p>
            </li>
    } ) : [], [ingredients, pizzaCounter, renderIngredients, pizzaSectionPrice])

    useEffect( () => {
        menu()
    }, [pizzaCounter, menu] )

      
    return(
        <div className="menu">
            <div className="header">
                <h1 className="popup-head-one">Pizza Builder!</h1>
                <h4 className="menu-h4">by Patryk Chodacki</h4>
                {popupShow ? <button className="menu-btn" onClick={ ()=> { pizzaCounterAdd(); close() } }>Zaczynamy!</button> : null}
            </div>
          { popupShow ? null : <nav className="menu-nav" >                
                <h3 className="menu-h3">Najlepszej jakości składniki:</h3>
                <ul className="menu-nav-ul">
                    {[...menu()]}
                </ul>
            </nav> }
            { popupShow ? null : <h3 className="menu-h3" >Razem: <span className="menu-price">{parseFloat(pizzaPrice).toFixed(2)}</span></h3>}
           { popupShow ? null : <button className="menu-btn" onClick={ () => setEnd( true ) }>Zamów!</button> }
           { end ? <div className="end-popup">
               <h2 className="end-h2">Gotowe!</h2>
               <h3 className="end-h3">Twoje zamówienie wyniosło </h3>
               <span className="end-price">{parseFloat(pizzaPrice).toFixed(2)}</span>
               <h2 className="end-h2">Dziękujemy!*</h2>
               <h4 className="end-h4">*Tak naprawdę to wcale nie dziękujemy, Twoje zamówienie nigdy nie zostanie zrealizowane, to był tak naprawę symulator przeganiania muchy...</h4>
           </div> : null }
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
        renderIngredients : ( id ) => dispatch( {type : PIZZA_COUNTER_SET, payload : { id } }),
        pizzaCounterAdd : () => dispatch( { type : PIZZA_COUNTER_ADD } ),
        close : () => dispatch( { type : POPUP_SHOW } )
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Menu);