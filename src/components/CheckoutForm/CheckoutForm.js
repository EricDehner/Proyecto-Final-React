import "./CheckoutForm.css"
import Swal from "sweetalert2";
import { db } from '../../service/firebase/index'
import { CartContext } from "../../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { collection, getDocs, query, where, documentId, writeBatch, addDoc } from 'firebase/firestore'

const CheckoutForm = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")
    const { cart, total, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const buyConfirm = (e) => {
        e.preventDefault()// eslint-disable-next-line
        if (name !== "" && /[A-z\s.a-z]+$/.test(name) && lastName !== "" && /[A-z\s.a-z]+$/.test(lastName) && phone !== "" && phone.length >= 8 && mail !== "" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            Swal.fire({
                title: '¿Desea realizar la compra?',
                text: "",
                showCancelButton: false,
                icon: 'question',
                iconColor: "grey",
                background: 'rgba(220, 220, 220)',
                confirmButtonColor: 'rgba(197, 200, 172)',
                cancelButtonColor: 'rgba(37, 37, 37, 0.254)',
                confirmButtonText: 'Confirmar',
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    createOrder()
                    Swal.fire({
                        icon: "success",
                        title: `${name}, ¡Tu compra fue exitosa!`,
                        text: `¡Nos contactaremos a la brevedad!`,
                        allowOutsideClick: false,
                        background: 'rgba(220, 220, 220)',
                        confirmButtonColor: 'rgba(37, 37, 37, 0.254)',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        } else (
            Swal.fire({
                position: 'center',
                icon: 'error',
                iconColor: "grey",
                background: 'rgba(220, 220, 220)',
                confirmButtonColor: 'rgba(197, 200, 172)',
                cancelButtonColor: 'rgba(37, 37, 37, 0.254)',
                title: '¡Verifique sus datos!',
                text: `Por favor complete correctamente los datos solicitados.`,
                showConfirmButton: false,
                timer: 3000
            })
        )
    }

    const buyCancel = (e) => {
        e.preventDefault()
        Swal.fire({
            title: '¿Desea cancelar la compra?',
            text: "",
            showCancelButton: true,
            icon: 'question',
            iconColor: "grey",
            background: 'rgba(220, 220, 220)',
            confirmButtonColor: 'rgba(197, 200, 172)',
            cancelButtonColor: 'rgba(37, 37, 37, 0.254)',
            confirmButtonText: 'Cancelar compra',
            cancelButtonText: "Continuar comprando"
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart()
                navigate(`/`)
                Swal.fire({
                    icon: "success",
                    title: `¡Tu compra fue cancelada!`,
                    text: `¡Lo invitamos a que siga viendo nuestros productos!`,
                    allowOutsideClick: false,
                    background: 'rgba(220, 220, 220)',
                    confirmButtonColor: 'rgba(37, 37, 37, 0.254)',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
    }

    const createOrder = async () => {

        try {
            const objOrder = {
                buyer: {
                    name: { name },
                    lastName: { lastName },
                    phone: { phone },
                    mail: { mail }
                },
                items: cart,
                total: total
            }

            const batch = writeBatch(db)

            const outOfStock = []

            const ids = cart.map(prod => prod.id)

            const productsRef = collection(db, 'products')

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const { docs } = productsAddedFromFirestore

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

            if (outOfStock.length === 0) {
                await batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)

                clearCart()

                navigate('/')

                Swal.fire({
                    icon: "info",
                    title: '¡Su numero de orden!',
                    text: `El numero de orden es, ${orderAdded.id}`,
                    allowOutsideClick: false,
                    background: 'rgba(220, 220, 220)',
                    confirmButtonColor: 'rgba(37, 37, 37, 0.254)',
                    confirmButtonText: 'Volver al inicio'
                })

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '¡Lo sentimos! ¡Productos fuera de stock!',
                    text: `Vuelva a cargar los productos que desea con el stock actualizado.`,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form className="form_container">
            <h2 className="check_tittle">Datos cliente</h2>
            <div>
                <input className="formImputs" type="text" placeholder="Ingrese su nombre.." onChange={ev => setName(ev.target.value)} />
            </div>
            <div>
                <input className="formImputs" type="text" placeholder="Ingrese su apellido.." onChange={ev => setLastName(ev.target.value)} />
            </div>
            <div>
                <input className="formImputs" type="number" placeholder="Ingrese su telefono.." onChange={ev => setPhone(ev.target.value)} />
            </div>
            <div>
                <input className="formImputs" type="email" placeholder="Ingrese su e-mail.." onChange={ev => setMail(ev.target.value)} />
            </div>
            <div className="button_container">
                <button className="cancelBuy_btn--alt" onClick={buyCancel} >
                    <p className="p">Cancelar compra</p>
                    <i className="fa-solid fa-trash trash_padd"></i>
                </button>
                <button className="buy_btn--alt" onClick={buyConfirm} >
                    <p className="p">Comprar</p>
                    <i className="fa-regular fa-credit-card"></i>
                </button>
            </div>
        </form>
    )
}
export default CheckoutForm 