
import "./ItemDetailContainer.css"
import ItemDetail from "../ItemDetail/ItemDetail"
import { db } from "../../service/firebase"
import { DotWave } from '@uiball/loaders'
import { useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"

const ItemDetailContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { productId } = useParams()

    useEffect(() => {
        document.title = `Reina Batata | ${products.name ? products.name : "Detalle"}`
    })

    useEffect(() => {

        const docRef = doc(db, "products", productId)

        getDoc(docRef).then(response => {

            const data = response.data()
            const productAdapted = { id: response.id, ...data }
            setProducts(productAdapted)
        }).finally(() => {
            setLoading(false)
        })
    }, [productId])

    if (loading) {
        return (
            <div className="uiball_loader">
                <DotWave size={110} speed={1} color="rgba(0, 0, 0, 0.733)" />
            </div>
        )
    }

    return (
        <div className="item_detail-container">
            <ItemDetail {...products} />
        </div>
    )
}
export default ItemDetailContainer