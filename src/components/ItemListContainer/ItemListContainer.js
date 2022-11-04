import "./ItemListContainer.css"
import ItemList from "../ItemList/ItemList"
import { db } from "../../service/firebase"
import { DotWave } from '@uiball/loaders'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDocs, collection, query, where } from "firebase/firestore"

const ItemListContainer = ({ tittleItemList }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()

    useEffect(() => {
        document.title = "Reina batata | Productos"
    })

    useEffect(() => {

        setLoading(true)

        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')

        getDocs(collectionRef).then(response => {
            const productsAdapted = response.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data }
            })
            setProducts(productsAdapted)
        }).finally(() => {
            setLoading(false)
        })
    }, [categoryId])

    if (loading) {
        return (
            <div className="uiball_loader">
                <DotWave size={110} speed={1} color="rgba(0, 0, 0, 0.733)" />
            </div>
        )
    }

    return (
        <div>
            <div className="itemList_container">
                <h1 className="tittleItemList">{tittleItemList} </h1>
                <ItemList products={products} />
            </div>
        </div>
    )
}
export default ItemListContainer