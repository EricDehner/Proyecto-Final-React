import "./Counter.css"
import { useState } from "react"

const Counter = ({ maxStock, initial = 1, onAdd }) => {
    const [counter, setCounter] = useState(initial)

    const subtract = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    const add = () => {
        if (counter < maxStock) {
            setCounter(counter + 1)
        }
    }

    return (
        <div className="counter_container">
            <div className="counter_stock">
                <div className="counterBtn" >
                    <button className="counter-subtract" onClick={subtract}>-</button>
                    <p className="counter-numb" >{counter}</p>
                    <button className="counter-add" onClick={add}>+</button>
                </div>
                <div>
                    <p className="counter-stock">Stock disponible: {maxStock} </p>
                </div>
            </div>
            <div>
                <button className="Buttoon" onClick={() => onAdd(counter)}>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default Counter