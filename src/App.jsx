import React from "react"
import { useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    function generateNewDice() {
        return (
            new Array(10)
                .fill(0)
                .map(() => (
                    {
                        id: nanoid(),
                        value: Math.ceil(Math.random() * 6),
                        isHeld: false
                    }
                ))
        )
    }

    const [dice, setDice] = useState(() => generateNewDice())
    const [count, setCount] = useState(0)

    let gameWon =
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value == dice[0].value)


    let diceElements = dice.map((el) =>
        <Die key={el.id} id={el.id} value={el.value} isHeld={el.isHeld} hold={hold} />
    )

    function roll() {
        if (gameWon) {
            setCount(0)
            setDice(generateNewDice())
        } else {
            setCount(preValue => preValue + 1)
            setDice(preDice =>
                preDice.map(el =>
                    el.isHeld
                        ? el
                        : { ...el, value: Math.ceil(Math.random() * 6) }
                ))
        }
    }

    function hold(id) {
        setDice(preValue =>
            preValue.map(el =>
                el.id === id
                    ? { ...el, isHeld: !el.isHeld }
                    : el
            ))
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <div className="container">
                <h3 className="heading">Tenzies</h3>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="btn-container">
                    {diceElements}
                </div>
                <button id="roll-btn" onClick={roll}>{gameWon ? "New Game" : "Roll"}</button>
                <p>Total count {count}</p>
            </div>
            <footer>
                <p>Made by Shambhu.</p>
            </footer>
        </main>
        
    )
}