import "../../assets/clients/login.css"
import email from '../../assets/images/email.png'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';
import { useState } from "react";
import Modal from '../Modal'
import UsersManager from "../../services/user.Api";
import OrdersManager from "../../services/order.Api";
import { useUserContext } from "../../context/User";

const Register = () => {
    const context = useCartContext()
    const navigate = useNavigate()
    const contextUser = useUserContext()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [created, setCreated] = useState(false)
    const [notCreated, setNotCreated] = useState(false)
    const [errors, setErrors] = useState(null)


    const image = 'https://cdn-icons-png.flaticon.com/512/1053/1053188.png?w=740&t=st=1675464717~exp=1675465317~hmac=123970fb6328e4fa8a9eb22784499c906aaddd8cf173382cf6cca075051fc494';

    const sendUserData = async () => {
        const userInformation = {
            username: userName,
            password: password,
            name: name
        }
        const response = await UsersManager.register(userInformation, setCreated, setNotCreated, setErrors)
        if (typeof response !== 'undefined') {
            contextUser.setUser(response.data)
            setErrors(null)
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
                            Introdoce tus datos
                        </label>
                        <input className="infoLogin" type="text" placeholder="Nombre Completo" onChange={(e) => setName(e.target.value)} />
                        <input className="infoLogin" type="text" placeholder="Correo electrónico" onChange={(e) => setUserName(e.target.value)} />
                        <input className="infoLogin" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                        <p className="passwordText">La contraseña debe tener un mínimo de 8 caracteres, una letra en mayúscula, un número al menos y un caracter especial.</p>
                        <button className='btnQuestion' onClick={sendUserData} >CREAR CUENTA</button>

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

        {created && <Modal title={"Bienvenido"} style={"btnModal"}  text={`${name.toUpperCase()} ya formas parte de la familia McDowell. Te enviaremos por email el ticket de tu pedido, gracias por tu compra`} textErrors={errors} route={() => sendOrder()} />}
        {notCreated && <Modal title={"Ha ocurrido un error"} style={"btnModal"}  textErrors={errors} route={() => setNotCreated(!notCreated)} />}
    </>

}

export default Register