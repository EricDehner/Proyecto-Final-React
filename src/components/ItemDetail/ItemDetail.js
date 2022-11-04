import "./ItemDetail.css"
import Counter from "../Counter/Counter"
import OutOfStock from "../OutOfStock/OutOfStock"
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import AddedToCart from "../AddedToCart/AddedToCart"

const ItemDetail = ({ id, img, name, description, price, stock }) => {

    const [added, setAdded] = useState(false);
    const { addItem, getProductQuantity } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, img, price, description, quantity
        }
        addItem(productToAdd, quantity)
        setAdded(true);
    }

    const quantityAdded = getProductQuantity(id)

    return (
        <div key={id} className="detail_container">
            <div className="detail">
                <img className="detail_img" src={img} alt={name} />
                <div className="detail_content">
                    <h1 className="detail_content-name">{name}</h1>
                    <h3 className="detail_content-description">{description} </h3>
                    <p className="detail_content-price">Precio: ${price} </p>
                    <div >
                        {stock !== 0
                            ? added ? <AddedToCart /> : < Counter onAdd={handleOnAdd} maxStock={stock} initial={quantityAdded} />
                            : <OutOfStock />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemDetail