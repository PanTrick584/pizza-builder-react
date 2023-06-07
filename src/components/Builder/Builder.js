import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { POPUP_SHOW } from "../../actions/actions";

const Builder = ({ pizzaAllIngredients }) => {
    const [top, setTop] = useState("100px");
    const [left, setLeft] = useState("100px");
    const [builderGrid, setBuilderGrid] = useState(Array.from(Array(25)))
    const ref = useRef(null);  

    const createBuilderGrid = () => {
        const arrayIngredients = builderGrid

        pizzaAllIngredients.map( ing => arrayIngredients[ing.randomid] = ing)
        
        const arrayBuilder = builderGrid.map( (cell, i) => cell ? <div className="builder-container-box ing" 
                                                                    style={{backgroundImage: `url(${cell.picture})`}} 
                                                                    key={i} 
                                                                    id={i}></div>
                                                                : <div className="builder-container-box" 
                                                                    key={i} 
                                                                    id={i}></div>);

        setBuilderGrid(arrayBuilder)
    }

    useEffect(() => {
        createBuilderGrid()
    },[pizzaAllIngredients])

    const flySomewhere = () => {
        let numTop = Math.floor(Math.random() * ref.current.clientHeight);
        setTop(`${numTop}px`);
        let numLeft = Math.floor(Math.random() * ref.current.clientWidth);
        setLeft(`${numLeft}px`);
    };

    return (
        <div className="builder" ref={ref}>
            <div
                className="pet"
                style={{ backgroundImage: "url('./img/pet.png')" }}
            ></div>
            <div
                className="fly"
                style={{
                    top: top,
                    left: left,
                    backgroundImage: "url('./img/fly.png')",
                }}
                onMouseEnter={flySomewhere}
            ></div>
            <div className="builder-container">
                {[...builderGrid]}
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        pizzaAllIngredients: store.pizzaAllIngredients
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch({ type: POPUP_SHOW })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);