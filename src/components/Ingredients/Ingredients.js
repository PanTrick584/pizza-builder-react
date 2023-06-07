import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux'
import { useEffect } from 'react'
import SingleIngredient from './Ingredient/Ingredient'

const Ingredients = ( { ingredients, pizzaCounter, removeIngredient, deleteIngredient, pizzaUniqueIngredients } ) => {
    const [topAmount, setTopAmount] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)
    const [currentScroll, setCurrentScroll] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)
    const [loadIngredients, setLoadIngredients] = useState(false)

    const refScroll = useRef()

    const ingredientsBox = useCallback( () => pizzaCounter >= 1 ? renderIngredients() : [], [pizzaCounter, ingredients, removeIngredient, deleteIngredient, pizzaUniqueIngredients])

    const renderIngredients = () => ingredients.map( ({name: groupName, id: gropuID, ingredients: groupIngredients }) => {
        if( gropuID === pizzaCounter ) {
            return groupIngredients.map( ({name: ingName, price: ingPrice, picture: ingPicture}, id) => {
                const ingredientAmount = pizzaUniqueIngredients && pizzaUniqueIngredients
                                            .map( ({name, amount}) => name === ingName && amount)
                                            .filter( num => num)
                                            .reduce(( num, sum ) => num + sum, 0)
                return <SingleIngredient
                             ingID={id}
                             ingPicture={ingPicture}
                             ingName={ingName}
                             groupName={groupName}
                             ingPrice={ingPrice}
                             ingredientAmount={ingredientAmount}
                        />
            } )
        }

        return []
    })

    useEffect( () => {
        ingredientsBox()
        setTimeout(() => ingredientsBox(), 100)
        setScrollHeight(refScroll.current.clientHeight);
    }, [pizzaCounter, ingredientsBox, ingredients, refScroll])

    useEffect(() => {
        setLoadIngredients(true)
        setTimeout(() => setLoadIngredients(false), 300)
    }, [pizzaCounter])

    useEffect(() => {
        setMaxScroll(Math.ceil(ingredientsBox().filter( box => box.length > 0).flat().length / 2) -1)
        setTopAmount(0)
        setCurrentScroll(0)
    }, [pizzaCounter])

    const countUp = () => {
        if(currentScroll > 0) {
            setCurrentScroll(currentScroll -1)
            setTopAmount(topAmount + scrollHeight)
        }
    }

    const countDown = () => {
       if( currentScroll < maxScroll) {
           setTopAmount(topAmount - scrollHeight)
           setCurrentScroll(currentScroll +1)
       } 
    }

    return(
        <div className="ingredients">
            {loadIngredients  && <div className="ingredients-popup">Loading...</div>}
            <div className="ingredients-container" ref={refScroll}>
                <div className="ingredients-container-scroll" style={{top: topAmount}}>
                    {[...ingredientsBox()]}
                </div>
            </div>
            <div className="ingredients-decoration">
                <span className="ingredients-decoration-arrow-top" onClick={() => countUp()}>{"<<"}</span>
                <span className="ingredients-decoration-arrow-bot" onClick={() => countDown()}>{">>"}</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients,
        pizzaCounter : state.pizzaCounter,
        pizzaUniqueIngredients: state.pizzaUniqueIngredients
    }
}

export default connect(mapStateToProps) (Ingredients);