import "./Cart.css"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"
import ProductsBtn from "../ProductsBtn/ProductsBtn"
import { useEffect, useState } from "react"
import { DotWave } from '@uiball/loaders'

const Cart = () => {
    const { cart, total, totalQuantity, deleteAskCart } = useContext(CartContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Reina batata | Cart"
    })

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className='uiball_loader'>
                <DotWave size={110} speed={1} color='rgba(0, 0, 0, 0.733)' />
            </div>
        );
    }

    if (totalQuantity === 0) {
        return (
            <div className='cart_center'>
                <div className='cart_container--alt'>
                    <div className='cart'>
                        <h2 className='cart-tittle--alt'>
                            Actualmente no posee productos en el carrito
                        </h2>
                        <ProductsBtn />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="cart_container">
            <div className="margin-container">
                {cart.map(prod => <CartItem key={prod.id} {...prod} />)}
                <div className="cart_footer">
                    <div className="cart_price">
                        <p className="tlt-text">Precio total: </p>
                        <p className="tlt-quantity">${total}</p>
                    </div>
                    <button className="cart_footer-cleanBtn" onClick={() => deleteAskCart()}>Vaciar carrito</button>
                    <Link to="/checkout">
                        <button className="cart_footer-btn">Comprar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Cart