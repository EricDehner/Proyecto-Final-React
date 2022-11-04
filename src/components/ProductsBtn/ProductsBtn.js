import "./ProductsBtn.css"
import { Link } from "react-router-dom"


const ProductsBtn = () => {
    return (
        <div className="btn_container">
            <Link to="/">
                <button className="cart_btn--alt">Nuestros productos</button>
            </Link>
        </div>
    )
}
export default ProductsBtn