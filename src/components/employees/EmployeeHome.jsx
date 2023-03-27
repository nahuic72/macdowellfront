import '../../assets/employees/employeeshome.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/User';
import UsersManager from '../../services/user.Api';
import Modal from '../Modal';

function EmployeeHome() {

    const navigate = useNavigate();
    const contextUser = useUserContext()

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [notLoggedIn, setNotLoggedIn] = useState(false)

    const LoginUser = async (e) => {
        e.preventDefault();
        const infoUser = {
            username: userName,
            password: password
        }
        const response = await UsersManager.login(infoUser, setLoggedIn, setNotLoggedIn)
        if (typeof response !== 'undefined') {
            contextUser.setUser(response.data)
            navigate('/employees')
        }
    }

    return (
        <>
            <div className='containerLog'>
                <div className="logITitle">
                    <p className='logInText'>
                        LOG IN
                    </p>
                </div>
                <div className='formDiv'>
                    <form className='form' onSubmit={LoginUser}>
                        <img className='userImg' src='https://cdn-icons-png.flaticon.com/512/3899/3899618.png' alt='NOT FOUND' />
                        <label className='user' for="fname">
                            USER
                        </label>

                        <input className='userInput' type="text" id="employeeUser"
                            name="employeeemail" placeholder="Introduzca usuario" onChange={(e) => setUserName(e.target.value)} required />

                        <label className='password'>PASSWORD</label>

                        <input className='passwordInput' type="password" id="emailOrder"
                            name="empPass" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />

                        <input className='logInBtn' type="submit" value="LOG IN" />
                        {/* <button className='logInBtn' onClick={() => LoginUser()}>LOG IN</button> */}

                    </form>
                </div>
            </div>
            
            {notLoggedIn && <Modal title={"Ha habido un error"} text={"Usuario y/o contraseña no encontrado"} style={"btnModalEmployees"}  route={() => setNotLoggedIn(false)} />}
        </>

    )
}

export default EmployeeHome;