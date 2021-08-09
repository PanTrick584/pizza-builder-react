import React from 'react'
import { connect } from 'react-redux'

import Ingredients from '../Ingredients/Ingredients'
import Builder from '../Builder/Builder'

import './Section.css'

const Section = ( { popupShow } ) => {
    return (
        <div className="section" style={{ backgroundColor: popupShow ? "var(--color-main)" : "var(--color-grey)" }} >
            { popupShow ? <div className="section-box"></div> : null}
            { popupShow ? null : <Builder /> }
           { popupShow ? null : <Ingredients />}
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
