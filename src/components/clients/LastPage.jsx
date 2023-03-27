import '../../assets/clients/clientshome.css'
import pronto from '../../assets/images/pronto.png'
import mcTitleLast from '../../assets/images/title.png'
import vuelva from '../../assets/images/vuelva.png'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/ShoppingCartContext';



function LastPage() {
    const context = useCartContext();
    const navigate = useNavigate();
    function redireccionar() {

        setTimeout(() => navigate('/'), 5000)
    }


    return (
        <>
            <div className="container" onLoad={() => redireccionar()}>
                <div className='leftContainer'></div>
                <div className="centerContainer">
                    <div className='topDiv'>
                        <img className='mcTitleLast' src={mcTitleLast} alt='NOT FOUND' />
                    </div>
                    <img className='vuelva' src={vuelva} alt='NOT FOUND' />
                    <img className='pronto' src={pronto} alt='NOT FOUND' />

                    <div className='bottomDiv'>
                    </div>
                </div>
                <div className='rigthContainer'>
                </div>
            </div>
        </>
    )
}

export default LastPage;
