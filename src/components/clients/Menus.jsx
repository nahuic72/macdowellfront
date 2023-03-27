import React, { useState } from 'react';
import mcTitle from '../../assets/images/title.png'
import '../../assets/clients/menus.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useCartContext } from '../../context/ShoppingCartContext';
import ProductsManager from '../../services/products.Api';


function Menus() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const context = useCartContext();

    useEffect(() => {
       /* const getProducts = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/all-products`);
            setProducts(response.data);
        }
        getProducts(); */
        ProductsManager.getAllProducts(setProducts)

    }, [])


    return (
        <>
            <div className="containerMenus">
                <div className='leftContainerMenu'></div>
                <div className="centerContainerMenu">
                    <div className='topMenu'>
                        <img className='mcTitleMenu' src={mcTitle} alt='NOT FOUND' />
                    </div>
                    <div className='centerMenu'>
                        {products.map((product) =>

                            <div key={product.id_product} className='menuContainer'>
                                <img className='mcBig' src={product.image} alt='NOT FOUND' />
                                <button className='mcBtn' onClick={() => navigate(`/menus/${product.id_product}`)}>
                                    {product.name}
                                    <br />
                                    {product.price}

                                </button>
                            </div>

                        )}

                    </div>
                    <div className='bottomMenu'>
                        <div className='bottomLeft' >
                            {(context.totalCart[0].totalPrice<=0 )? 
                            <p className='vacio'>No hay nada en el carrito</p> : 
                            <p className='resumen' onClick={() => navigate(`/cart`)}>Ver resumen del pedido</p>}
                        </div>
                        <div className='bottomRight' >
                            <p className='total' >TOTAL: {context.totalCart[0].totalPrice}€</p>
                        </div>
                    </div>
                </div>
                <div className='rigthContainerMenu'>
                </div>
            </div>
        </>
    )
}

export default Menus;
