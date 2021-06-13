import React from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { PIZZA_COUNTER_ADD, POPUP_SHOW } from '../../actions/actions' 

import './BuilderPopup.css'

const BuilderPopup = ( { pizzaCounterAdd, popupShow, close } ) => {

    return(
        <div className="builder-popup">
            <div className="builder-popup-box">
                <h1 className="builder-popup-box-header">Witaj! Swórz swoją własną pizze!</h1>
                    <button className="builder-popup-box-button" onClick={ ()=> { pizzaCounterAdd(); close() } }>Zaczynamy!</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return{
        pizzaCounterAdd : () => dispatch( { type : PIZZA_COUNTER_ADD } ),
        close : () => dispatch( { type : POPUP_SHOW } )
    }
}

export default connect(null, mapDispatchToProps) (BuilderPopup)