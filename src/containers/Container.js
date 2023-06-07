import React from "react";
import { connect } from "react-redux";
// COMPONENTS
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import Ingredients from "../components/Ingredients/Ingredients";
import Builder from "../components/Builder/Builder";

import { PIZZA_COUNTER_ADD, POPUP_SHOW } from "../actions/actions";

const Container = ({ popupShow, close, pizzaCounterAdd}) => {
    return (
        <div className="container">
            <SidebarMenu />
            <div className="main" style={{backgroundImage: `url(img/pizza-builder-0.jpg)`}}>
                <Builder />
                <Ingredients />
                {popupShow && <div className="main-popup" 
                                   style={{backgroundImage: `url(img/background.jpg)`}}>
                                        <div className="main-popup-btn"  onClick={() => { pizzaCounterAdd(); close(); }}> Kliknij i stwórz <br /> swoją pizzę!</div>
                              </div>}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pizzaCounter: state.pizzaCounter,
        popupShow: state.popupShow,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pizzaCounterAdd: () => dispatch({ type: PIZZA_COUNTER_ADD }),
        close: () => dispatch({ type: POPUP_SHOW }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
