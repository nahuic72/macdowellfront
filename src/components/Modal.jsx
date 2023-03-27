import '../assets/clients/modal.css'
import { useState } from 'react';

const Modal = (props) => {
    const [MsgErrors, setMsgEerrors] = useState(props.textErrors)


    return <>
        <div className="containerModal">

            <div className="containerModal_1" onClick={props.back}>

                <h1 className="textModal">{props.title}</h1>
                {MsgErrors ? MsgErrors.map((error, i) => <p key={i} className="textModal_P">{error.msg}</p>) : 
                    <p className="textModal_P">{props.text}</p>}
                <button className={props.style} onClick={props.route}>ACEPTAR</button>
            </div>
        </div>
    </>
}

export default Modal;