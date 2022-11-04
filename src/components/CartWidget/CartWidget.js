import "./CartWidget.css"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"

const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    return (
        <div className="cartWidget">
            <Link to="/cart" className="cartWidget">
                <i className="fa-solid fa-cart-shopping"></i> {totalQuantity}
            </Link>
        </div>
    )
}

export default CartWidget