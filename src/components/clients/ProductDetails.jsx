import React from 'react';
import details from '../../assets/images/details.png'
import '../../assets/clients/productdetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useCartContext } from '../../context/ShoppingCartContext';
import ProductsManager from '../../services/products.Api';


function ProductDetails() {

    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const context = useCartContext();


    useEffect(() => {
        /*const getProduct = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
            setProduct(response.data);
        }
        getProduct();*/
        ProductsManager.getSingleProduct(setProduct, id)
    }, [])

    const addProduct = () => {
        const isInCart = context.cart.find(item => item.id_product === product.id_product)

        if (isInCart) {
            const setOneProd = context.cart.map(item => 
                item.id_product === isInCart.id_product ? {
                    ...item, quantity: item.quantity + 1, total: product.price * (item.quantity + 1)
                } : item
            );
            context.setCart(setOneProd); 
        } else {
            
            context.cart.push({
                ...product,
                total: product.price,
                quantity: 1

            })
        }

        const setTotalPrice = context.totalCart.map((item) => {
            return (
                {   
                    totalPrice: item.totalPrice + product.price,
                    totalQuantity: item.totalQuantity + 1
                })
        })
        
        context.setTotalCart(setTotalPrice)

    }


    return (
        <>
            <div className="containerDetails">
                <div className='leftContainerDetails'></div>
                <div className="centerContainerDetails">
                    <div className='topDetails'>
                        <img className='detailsTitle' src={details} alt='NOT FOUND' />
                    </div>
                    <div className='detailsContainer' key={product.id_product}>
                        <p className='menu'>{product.name}</p>

                        <div className='centerDetails'>
                            <img className='detailsMc' src={product.image} alt='NOT FOUND' />
                            <p className='pDetails'>
                                {product.description}
                            </p>
                        </div>
                        <p className='menuPrice'>
                            Precio: {product.price}€
                        </p>
                        <p className='menuPrice'>
                            Total carrito: {context.totalCart[0].totalPrice}€
                        </p>

                    </div>

                    <div className='bottomMenu'>
                        <div className='bottomLeftDetails' >
                            <button className='add' onClick={() => addProduct(product.id_product)}>AÑADIR AL PEDIDO</button>
                        </div>
                        <div className='bottomRightDetails'>
                            <button className='select ' onClick={() => navigate(`/menus`)}>VOLVER A SELECCIÓN</button>

                        </div>

                    </div>

                </div>
                <div className='rigthContainerMenu'>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;

/*
                                Hamburguesa de tierna carne de vaca Wagyū, hecha en plancha Jasper a 180ºC para
                                conseguir el punto exacto.
                                <br />
                                Con queso parmesano y queso americano ligeramente ahumado, bacon crispy, lechuga batavia, pomodoro y cebolla morada.
                                <br />
                                Todo ello acompañado de nuestras patatas bastón ecológicas cortadas en el día y cocinadas en aceite de oliva.
 
*/
