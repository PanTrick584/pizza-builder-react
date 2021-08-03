import React from 'react';
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { PIZZA_COUNTER_ADD, POPUP_SHOW } from '../../actions/actions' 

import './BuilderPopup.css'

const BuilderPopup = ( { pizzaCounterAdd, popupShow, close } ) => {

    return(
        <div className="popup">
            <div className="builder-popup-box">
                <h1 className="popup-head-one">Pizza Builder!</h1>
                <h4 className="popup-head-four">by Patryk Chodacki</h4>
            </div>
               {popupShow ? <button className="builder-popup-box-button" onClick={ ()=> { pizzaCounterAdd(); close() } }>Zaczynamy!</button> : null}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        popupShow: state.popupShow
    }
}

const mapDispatchToProps = dispatch => {
    return{
        pizzaCounterAdd : () => dispatch( { type : PIZZA_COUNTER_ADD } ),
        close : () => dispatch( { type : POPUP_SHOW } )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BuilderPopup)