import email from '../../assets/images/email.png'
import '../../assets/clients/emailpage.css'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';
import { useState } from 'react';
import OrdersManager from '../../services/order.Api';
import Modal from '../Modal'



function EmailPage() {
    const navigate = useNavigate();
    const context = useCartContext();
    const image = 'https://cdn-icons-png.flaticon.com/512/1053/1053188.png?w=740&t=st=1675464717~exp=1675465317~hmac=123970fb6328e4fa8a9eb22784499c906aaddd8cf173382cf6cca075051fc494';

    const [userEmail, setUserEmail] = useState()
    const [notCreated, setNotCreated] = useState(false)
    const [error, setError] = useState()

    const sendCart = async (e) => {
        e.preventDefault()
        let order = await context.cart
        let mail = { email: userEmail, id_user: null }
        const response = await OrdersManager.createOrder(mail, order, setNotCreated, setError)
        if (typeof response !== 'undefined') {
            context.setCart([])
            context.setTotalCart([{
                totalPrice: 0,
                totalQuantity: 0
            }])
            navigate('/see-you-soon') 
        }
        
    }

    return (
        <>
            <div className="containerEmail">
                <div className='leftContainerEmail'></div>
                <div className="centerContainerEmail">
                    <div className='topEmail'>

                        <img className='emailImg' src={email} alt='NOT FOUND' />
                    </div>
                    <div className='centerEmail' >
                        <form className='centerEmail' onSubmit={sendCart} >
                            <label className='infoText' for="fname">
                                A continuación introduzca un email válido para remitirle el ticket correspondiente a su pedido.

                            </label>
                            <input className='email' type="text" id="emailOrder"
                                name="clientemail" placeholder="Introduzca email"
                                onChange={(e) => setUserEmail(e.target.value)} required />

                            <input className='sendEmail' type="submit" value="ENVIAR" />

                        </form>
                    </div>

                    <div className='bottomEmail'>

                        <p className='totalEmail'>
                            <img className='returnBtnEmail' src={image} onClick={() => navigate('/register-or-continue')} />

                            TOTAL: {context.totalCart[0].totalPrice}€
                        </p>

                    </div>
                </div>
                <div className='rigthContainerMenu'>
                </div>
            </div>
            {notCreated && <Modal title={"Ha ocurrido un error"} textErrors={error} style={"btnModal"} route={() => setNotCreated(!notCreated)} />}
        </>
    )
}

export default EmailPage;
