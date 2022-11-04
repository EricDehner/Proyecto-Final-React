import "./Item.css"
import { Link } from "react-router-dom"

const Item = ({ id, img, name, description, price }) => {
    return (
        <div className="item_container">
            <img className="item_img" src={img} alt={name} />
            <div className="item_content">
                <h1 className="item_name">{name}</h1>
                <h2 className="item_description">{description} </h2>
                <div className="itemm">
                    <Link to={`/detail/${id}`}>
                        <button className="item_buttom">Ver detalle</button>
                    </Link>
                    <h3 className="item_price">${price} </h3>
                </div>
            </div>
        </div>
    )
}
export default Item