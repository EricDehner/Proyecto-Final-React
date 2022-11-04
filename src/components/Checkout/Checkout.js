import "./Checkout.css"
import Error from "../Error/Error"
import CheckoutCart from "../CheckoutCart/CheckoutCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { DotWave } from '@uiball/loaders'

const Checkout = () => {

    useEffect(() => {
        document.title = "Reina batata | Checkout"
    })

    const { totalQuantity } = useContext(CartContext)
    const [loading, setLoading] = useState(true);

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
            <div>
                <Error emptyCartt={"Su carrito ha desaparecido, ¡vea nuestros productos!"} />
            </div>
        )
    }

    return (
        <div>
            <div className="checkout_container">
                <div>
                    <CheckoutForm />
                </div>
                <span className="stick"></span>
                <div className="form_container-cart">
                    <CheckoutCart />
                </div>
            </div>
        </div>
    )
}

export default Checkout