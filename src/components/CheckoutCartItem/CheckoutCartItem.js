import "./CheckoutCartItem.css"

const CheckoutCartItem = ({ img, quantity, name }) => {
    return (
        <div className="checkout_item">
            <img src={img} className="checkout_img" alt={name} />
            <p className="checkout_quantity">{quantity} </p>
        </div>
    )
}
export default CheckoutCartItem