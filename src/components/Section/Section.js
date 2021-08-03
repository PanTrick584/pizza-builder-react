import React from 'react'
import { connect } from 'react-redux'

import Ingredients from '../Ingredients/Ingredients'
import Builder from '../Builder/Builder'

import './Section.css'

const Section = ( { pizzaCounter, popupShow } ) => {
    return (
        <div className="section" style={ { backgroundImage: `url(./img/pizza-builder-${ pizzaCounter }.png)` } }>
            { popupShow ? null : <Builder /> }
            <Ingredients />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        pizzaCounter: state.pizzaCounter,
        popupShow: state.popupShow
    }
}
export default connect(mapStateToProps)(Section)
