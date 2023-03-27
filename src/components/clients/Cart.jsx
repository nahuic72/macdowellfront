import React from 'react';
import resumen from '../../assets/images/resumen.png'
import pedido from '../../assets/images/resumen2.png'
import '../../assets/clients/cart.css'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';




function Cart() {
    const navigate = useNavigate();
    const context = useCartContext();
    


    const addProduct = (id) => {

       const isInCart = context.cart.find(item => item.id_product === id)
       
        if (isInCart) {
            const setOneProd = context.cart.map(item =>
                item.id_product === isInCart.id_product ? {
                    ...isInCart,
                    quantity: isInCart.quantity + 1,
                    total: isInCart.price * (isInCart.quantity + 1)
                } : item
            );
            context.setCart(setOneProd);
        }

        const setTotalPrice = context.totalCart.map((item) => {
            return (
                {
                    totalPrice: item.totalPrice + isInCart.price,
                    totalQuantity: item.totalQuantity + 1
                })
        })
        context.setTotalCart(setTotalPrice)

    }

    const deleteProduct = (id) => {
        const isInCart = context.cart.find(item => item.id_product === id)

        if (isInCart.quantity === 1) {

            const setDeleteProd = context.cart.filter(item => isInCart.id_product !== item.id_product);         
            context.setCart(setDeleteProd);
    
        } else {

            const setDeleteOne = context.cart.map(item =>
                item.id_product === isInCart.id_product ? {
                    ...isInCart,
                    quantity: isInCart.quantity - 1,
                    total: isInCart.price * (isInCart.quantity - 1)
                } : item
            );
            context.setCart(setDeleteOne);
        }
        const setTotalPrice = () => context.totalCart.map((item) => {
            return (
                {
                    totalPrice: item.totalPrice - isInCart.price,
                    totalQuantity: item.totalQuantity - 1
                })
        })
        context.setTotalCart(setTotalPrice)

    }


    return (
        <>
            <div className="containerCart">
                <div className='leftContainerCart'></div>
                <div className="centerContainerCart">
                    <div className='topCart'>
                        <img className='resumenimg' src={resumen} alt='NOT FOUND' />
                        <img className='pedidoimg' src={pedido} alt='NOT FOUND' />
                    </div>
                    <div className='centerCart'>
                        {context.cart.map((product) => //Hacemos el map sobre el context, lo que hay en el carrito y asi evitamos la llamada

                            <div className='topCenterCart' key={product.id_product}>
                                <div>
                                    <p className='menuTitle'>{product.name}</p>
                                </div>

                                <div className='topCenterCartDiv'>
                                    <img className='mcJrCart' src={product.image} alt='NOT FOUND' />
                                    <button className='menos' onClick={() => deleteProduct(product.id_product)} disabled={product.quantity === 0 ? true : false}>-</button>
                                    <div className='cantidad'>{product.quantity}</div>
                                    <button className='mas' onClick={() => addProduct(product.id_product)}>+</button>
                                    <div className='precioUd'>{product.price}€</div>
                                    <div className='precioTotMen'>{product.total}€</div>
                                </div>

                            </div>)}

                        <p className='totalCart'> TOTAL: {context.totalCart[0].totalPrice}€ </p>
                    </div>
                    <div className='bottomCart'>
                        <button className='resumeCart' onClick={() => navigate(`/menus`)}>
                            REANUDAR PEDIDO
                        </button>
                        <button className='finishCart' onClick={() => navigate(`/register-or-continue`)}>
                            FINALIZAR PEDIDO
                        </button>
                    </div>
                </div>
                <div className='rigthContainerMenu'>
                </div>
    </div>  
        </>
    )
}

export default Cart;
