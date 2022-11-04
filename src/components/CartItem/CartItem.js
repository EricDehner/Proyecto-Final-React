import './CartItem.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'


const CartItem = ({ id, name, img, quantity, description, price }) => {
    const { deleteAsk } = useContext(CartContext)

    return (
        <div className="cart">
            <div className="cardCarrito">
                <img src={img} className="cart_image" alt={name} />
                <div className="cart_cont">
                    <h2 className="cart-tittle">{name}</h2>
                    <h3 className="cart-description">{description}</h3>
                    <div className="card-data">
                        <div className="cart-quantity">
                            <p className="card-text">Precio:</p>
                            <p className="number-quantity">${price}</p>
                        </div>
                        <div className="cart-quantity">
                            <p className="card-text">Cantidad:</p>
                            <p className="number-quantity">{quantity}</p>
                        </div>
                        <div>
                            <p className="cart-trash" onClick={() => deleteAsk(id)}><i className="fa-solid fa-trash"></i></p>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
export default CartItem