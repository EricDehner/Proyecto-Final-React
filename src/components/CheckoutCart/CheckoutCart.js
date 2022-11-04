import "./CheckoutCart.css"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import CheckoutCartItem from "../CheckoutCartItem/CheckoutCartItem"

const CheckoutCart = () => {

    const { cart, total } = useContext(CartContext)

    return (
        <div>
            <h2 className="check_tittle">Sus productos</h2>
            <div className="checkout_products-container">
                <div className="checkout_products">
                    {cart.map(p => <CheckoutCartItem key={p.id} {...p} />)}
                </div>
                <div className="tlt_footer">
                    <p className="tlt-text">Precio total: </p>
                    <p className="tlt-quantity">${total}</p>
                </div>
            </div>
        </div>
    )
}
export default CheckoutCart