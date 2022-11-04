import "./AddedToCart.css"
import { Link } from "react-router-dom"

const AddedToCart = () => {

    return (
        <div className="btns_container">
            <Link to="/">
                <button className="btn-continueShopping">
                    Ver mas productos
                </button>
            </Link>
            <Link to="/cart">
                <button className="btn-backToCart">
                    Ir al carrito
                    <i className="fa-solid fa-cart-shopping margin-cart"></i>
                </button>
            </Link>
        </div>
    )
}
export default AddedToCart