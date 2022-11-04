import "./NavBar.css"
import CartWidget from "../CartWidget/CartWidget"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../service/firebase"

const NavBar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {

        const collectionRef = collection(db, "categories")

        getDocs(collectionRef).then(response => {
            const categoriesAdapted = response.docs.map(doc => {
                const data = doc.data()
                const id = doc.id

                return { id, ...data }
            })
            setCategories(categoriesAdapted)
        })
    }, [])

    return (
        <nav className="navbar_color navbar navbar-expand-lg ">
            <div className="container-fluid ">
                <Link to="/" className="navbar_decoration">
                    <h1 className="navbar-icon">Reina Batata</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            categories.map(cat => (
                                <li className="nav-item space_item" key={cat.id}>
                                    <Link to={`/category/${cat.slug}`} className="nav-decoration">
                                        <button className="nav-link" href="">{cat.label}</button>
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="nav-item space_item">
                            <button id="btnCarrito" className="nav-link btn-carrito" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop">
                                <CartWidget />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavBar