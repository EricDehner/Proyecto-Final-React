import { useState, createContext, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"

export const CartContext = createContext({
    cart: [],
    totalQuantity: 0
})

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [totalQuantity, SetTotalQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const totalQty = getQuantity()
        SetTotalQuantity(totalQty)
    }, [cart])//eslint-disable-line

    useEffect(() => {
        const total = getTotal()
        setTotal(total)
    }, [cart])//eslint-disable-line

    const addItem = (productToAdd, quantity) => {
        if (!isInCart(productToAdd.id)) {
            productToAdd.quantity = quantity
            setCart([...cart, productToAdd])
            addAlert();
        } else {
            const cartUpdated = cart.map(prod => {
                if (prod.id === productToAdd.id) {
                    const productUpdated = {
                        ...prod,
                        quantity: quantity
                    }
                    addChangeAlert();
                    return (
                        productUpdated
                    )
                } else {
                    addAlert();
                    return prod
                }
            })

            setCart(cartUpdated)
        }
    }

    const addAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            showConfirmButton: false,
            background: 'rgba(220, 220, 220)',
            confirmButtonColor: 'rgba(197, 200, 172)',
            cancelButtonColor: 'rgba(37, 37, 37, 0.254)',
            timer: 1500
        })
    }

    const addChangeAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `¡La cantidad del producto fue modificada!`,
            showConfirmButton: false,
            background: 'rgba(220, 220, 220)',
            timer: 1500
        })
    }

    const deleteAskCart = () => {
        Swal.fire({
            title: '¿Deseas eliminar todos los productos del carrito?',
            text: "Todos los productos se eliminarán de tu carrito",
            showCancelButton: true,
            icon: 'question',
            iconColor: "grey",
            background: 'rgba(220, 220, 220)',
            confirmButtonColor: 'rgba(197, 200, 172)',
            cancelButtonColor: 'rgba(37, 37, 37, 0.254)',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart()
                navigate(`/`)
                Swal.fire(
                    '¡Productos eliminados!',
                    'Su productos fueron eliminados del carrito con exito.',
                    'success'
                )
            }
        })
    }

    const deleteAsk = (id) => {
        Swal.fire({
            title: '¿Deseas eliminar este producto?',
            text: "Este producto se eliminará de tu carrito",
            showCancelButton: true,
            icon: 'question',
            iconColor: "grey",
            background: 'rgba(220, 220, 220)',
            confirmButtonColor: 'rgba(197, 200, 172)',
            cancelButtonColor: 'rgba(37, 37, 37, 0.254)',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id)
                Swal.fire(
                    '¡Producto eliminado!',
                    'Su producto fue eliminado del carrito con exito.',
                    'success'
                )
            }
        })
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const cartWithoutProduct = cart.filter(prod => prod.id !== id)
        setCart(cartWithoutProduct)
    }

    const getQuantity = () => {
        let accu = 0
        cart.forEach(prod => {
            accu += prod.quantity
        })
        return accu
    }

    const getTotal = () => {
        let accu = 0
        cart.forEach(prod => {
            accu += prod.quantity * prod.price
        })
        return accu
    }

    const clearCart = () => {
        setCart([])
    }

    const getProductQuantity = (id) => {
        const product = cart.find(prod => prod.id === id)
        return product?.quantity
    }

    return (
        <CartContext.Provider value={{ isInCart, cart, addItem, removeItem, totalQuantity, total, clearCart, getProductQuantity, deleteAsk, deleteAskCart }}>
            {children}
        </CartContext.Provider>
    )
}