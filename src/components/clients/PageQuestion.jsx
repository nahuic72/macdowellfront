import '../../assets/clients/pageQuestion.css'
import email from '../../assets/images/email.png'
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';

const PageQuestion = () => {

    const navigate = useNavigate()
    const context = useCartContext();
    const image = 'https://cdn-icons-png.flaticon.com/512/1053/1053188.png?w=740&t=st=1675464717~exp=1675465317~hmac=123970fb6328e4fa8a9eb22784499c906aaddd8cf173382cf6cca075051fc494';

    return <>
        <div className="containerQuestion">
            <div className='leftContainerQuestion'></div>
            <div className="centerContainerQuestion">
                <div className='topQuestion'>

                    <img className='emailImg' src={email} alt='NOT FOUND' />
                </div>
                <div className='centerQuestion' >
                    <div className='centerQuestion'  >
                        <label className='infoText' for="fname">
                            Accede a tu cuenta o registrarte para acumular puntos con cada compra y disfrutar de descuentos exclusivos!.
                        </label>
                        <button className='btnQuestion' onClick={() => navigate('/login')}>Iniciar sesion</button>
                        <label className='infoText' for="fname">
                            También puedes continuar sin registrarte.
                        </label>

                        <button className='btnQuestion' onClick={() => navigate('/finish-order')}>Continuar sin registrarse</button>
                    </div>
                </div>

                <div className='bottonQuestion'>

                    <p className='totalBotton'>
                        <img className='returnBtnQuestion' src={image} alt='' onClick={() => navigate('/menus')} />

                        TOTAL: {context.totalCart[0].totalPrice}€
                    </p>

                </div>
            </div>
            <div className='rigthContainerQuestion'>
            </div>
        </div>

    </>
}


export default PageQuestion;