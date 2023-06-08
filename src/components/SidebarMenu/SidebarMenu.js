import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";

import {
    PIZZA_COUNTER_SET,
    PIZZA_COUNTER_ADD,
    POPUP_SHOW,
} from "../../actions/actions";

const Menu = ({
    popupShow,
    ingredients,
    pizzaCounter,
    renderIngredients,
    pizzaCounterAdd,
    close,
    pizzaPrice,
    pizzaIngGroupsPrice
}) => {
    const [end, setEnd] = useState(false);

    const menu = useCallback(() => pizzaCounter >= 1 ? ingredients.map((ing, id) => {
                      let highlightClass = pizzaCounter === id + 1 ? "menu-highlight" : "";
                      let price = pizzaIngGroupsPrice.map(({ setName, price}) => setName === ing.name && price).filter( price => price)
                      console.log(price);
                      console.log(typeof price[0]);

                      return (
                          <li className={`menu-nav-list-item ${highlightClass}`}
                              key={ing.id}
                              onClick={() => renderIngredients(id + 1)}>
                                {ing.name}
                              <p className="menu-nav-list-item-price">{!price.length || price[0] === '0.0'  ? "0.00" : price}</p>
                          </li>
                      );
                  })
                : [],
        [ingredients, pizzaCounter, renderIngredients, pizzaIngGroupsPrice]
    );

    useEffect(() => {
        menu();
    }, [pizzaCounter, menu]);

    return (
        <div className="menu">
            <div className="header">
                <h1 className="header-one">Pizza Builder!</h1>
                <h4 className="header-four">by</h4>
                <h2 className="header-two">Patryk Chodacki</h2>
            </div>
                {!popupShow && 
                <>
                    <nav className="menu-nav">
                        <h4 className="menu-nav-header-four">Najlepszej jakości składniki:</h4>
                        <ul className="menu-nav-list">{[...menu()]}</ul>
                    </nav>
                    <h3 className="menu-final">
                        Razem:
                        <div className="menu-final-price">
                            {parseFloat(pizzaPrice).toFixed(2)}
                        </div>
                    </h3>
                    <button className="menu-btn" onClick={() => setEnd(true)}>Zamów!</button>
                </>
                }
            {end && (
                <div className="end-popup">
                    <h2 className="end-h2">Gotowe!</h2>
                    <h3 className="end-h3">Twoje zamówienie wyniosło </h3>
                    <span className="end-price">
                        {parseFloat(pizzaPrice).toFixed(2)}
                    </span>
                    <h2 className="end-h2">Dziękujemy!*</h2>
                    <h4 className="end-h4">
                        *Tak naprawdę to wcale nie dziękujemy, Twoje zamówienie
                        nigdy nie zostanie zrealizowane, to był tak naprawę
                        symulator przeganiania muchy...
                    </h4>
                </div>
            )}
        </div>
    );
};
const mapStateToProps = (store) => {
    return {
        ingredients: store.ingredients,
        pizzaCounter: store.pizzaCounter,
        popupShow: store.popupShow,
        pizzaPrice: store.pizzaPrice,
        pizzaIngGroupsPrice: store.pizzaIngGroupsPrice
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        renderIngredients: (id) => dispatch({ type: PIZZA_COUNTER_SET, payload: { id } }),
        pizzaCounterAdd: () => dispatch({ type: PIZZA_COUNTER_ADD }),
        close: () => dispatch({ type: POPUP_SHOW }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
