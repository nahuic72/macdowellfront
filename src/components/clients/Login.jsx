import "../../assets/clients/login.css"
import email from '../../assets/images/email.png'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';
import { useState } from "react";
import UsersManager from "../../services/user.Api";
import OrdersManager from "../../services/order.Api";
import Modal from "../Modal";
import { useUserContext } from "../../context/User";


const Login = () => {
    const contextUser = useUserContext()
    const context = useCartContext()
    const navigate = useNavigate()

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [notLoggedIn, setNotLoggedIn] = useState(false)

    const image = 'https://cdn-icons-png.flaticon.com/512/1053/1053188.png?w=740&t=st=1675464717~exp=1675465317~hmac=123970fb6328e4fa8a9eb22784499c906aaddd8cf173382cf6cca075051fc494';

    const LoginUser = async () => {
        const infoUser = {
            username: userName,
            password: password
        }
        const response = await UsersManager.login(infoUser, setLoggedIn, setNotLoggedIn)
        if(typeof response !== 'undefined'){
            contextUser.setUser(response.data)
        }
    }

    const sendOrder = async () => {
        const order = context.cart
        const email = { email: userName.toLowerCase(), id_user: contextUser.user.id_user }
        await OrdersManager.createOrder(email, order)
        context.setCart([])
        context.setTotalCart([{
            totalPrice: 0,
            totalQuantity: 0
        }])
        contextUser.setUser([])
        navigate('/see-you-soon')
    }

    return <>
        <div className="containerLogin">
            <div className='leftContainerLogin'></div>
            <div className="centerContainerLogin">
                <div className='topLogin'>

                    <img className='emailImg' src={email} alt='NOT FOUND' />
                </div>
                <div className="centerLogin" >
                    <div className="centerLogin">
                        <label className='infoText' for="fname">
                            ACCEDE A TU CUENTA
                        </label>
                        <input className="infoLogin" type="text" placeholder="Correo electrónico" onChange={(e) => setUserName(e.target.value)} required/>
                        <input className="infoLogin" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required/>
                        <button className='btnQuestion' onClick={() => LoginUser()}>ACCEDER</button>
                        <label className='infoText' for="fname">-------- O --------</label>
                        <label className="createText" onClick={() => navigate('/register/new-account')}>CREA UNA CUENTA NUEVA</label>
                    </div>
                </div>
                <div className='bottonLogin'>

                    <p className='totalBotton'>
                        <img className='returnBtnLogin' src={image} onClick={() => navigate('/register-or-continue')} />

                        TOTAL: {context.totalCart[0].totalPrice}€
                    </p>

                </div>
            </div>
            <div className='rigthContainerLogin'></div>
        </div>
        {loggedIn && <Modal title={`Bienvenido ${contextUser.user.name.toUpperCase()}`} style={"btnModal"}  text={"Te enviaremos por email el ticket de tu pedido, gracias por tu compra"}
            route={() => sendOrder()} />}
        {notLoggedIn && <Modal title={"Ha habido un error"} style={"btnModal"}  text={"Email y/o contraseña no encontrado"} route={() => setNotLoggedIn(false)} />}
    </>

}

export default Login