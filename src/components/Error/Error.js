import "./Error.css"
import ProductsBtn from "../ProductsBtn/ProductsBtn"
import { useEffect } from "react"

const Error = ({ emptyCartt }) => {

    useEffect(() => {
        document.title = "Reina batata | Error"
    })

    return (
        <div className="content">
            <div className="content_img">
                <img src="https://i.imgur.com/9IIlkv3.png" alt="404" />
                <p className="content_number">404</p>
            </div>
            <div className="conten__Description">
                <p className="content_error">Pagina no encontrada</p>
                <p className="content_text">{emptyCartt}</p>
                <div className="content_btn">
                    <ProductsBtn />
                </div>
            </div>
        </div>
    )
}
export default Error