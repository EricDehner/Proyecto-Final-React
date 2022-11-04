import "./OutOfStock.css"
import ProductsBtn from "../ProductsBtn/ProductsBtn"

const OutOfStock = () => {
    return (
        <div className="outStock_container">
            <p className="outStock_text">Producto fuera de stock.</p>
            <p className="outStock_text-alt">Actualmente no contamos con stock de este producto, pero te invitamos a ver otros.</p>
            <ProductsBtn />
        </div>
    )
}
export default OutOfStock