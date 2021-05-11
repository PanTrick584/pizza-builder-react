import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'

import { PIZZA_COUNTER_SET } from '../actions/actions'

import './Menu.css'

const Menu = ( { ingredients, pizzaCounter, renderIngredients } ) => {

   

    const menu = useCallback(() => pizzaCounter >= 1  ? ingredients.map( (ing, id) => {
            let highlightClass = pizzaCounter === id + 1 ? 'menu-highlight' : ''
            return <li className={ highlightClass } key={ing.id} onClick={ ()=> renderIngredients( id +1 ) } >{ing.name}</li>
    } ) : [], [ingredients, pizzaCounter, renderIngredients])

    useEffect( () => {
        menu()
    }, [pizzaCounter, menu] )
    
    return(
        <div className="menu">
            <h3 className="menu-h3">Pizza Builder</h3>
            <nav className="menu-nav" >
                <h4 className="menu-nav-h4">Zaczynamy!</h4>
                
                <ul className="menu-nav-ul">
                    {[...menu()]}
                </ul>
            </nav>
        </div>
    )
}
const mapStateToProps = store => {
    return { 
        ingredients : store.ingredients,
        pizzaCounter : store.pizzaCounter
    }
}
const mapDispatchToProps = dispatch => {
    return {
        renderIngredients : ( id ) => dispatch( {type : PIZZA_COUNTER_SET, payload : { id } })
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Menu);