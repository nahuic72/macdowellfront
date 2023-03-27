import { useState } from 'react'
import '../../assets/employees/employeesRegister.css'
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/User';
import UsersManager from '../../services/user.Api';
import NewUser from './NewUser';



const RegisterEmployees = () => {
    const navigate = useNavigate()
    const contextUser = useUserContext()

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()
    const [created, setCreated] = useState(false)
    const [notCreated, setNotCreated] = useState(false)
    const [errors, setErrors] = useState(null)




    const RegisterUser = async (e) => {
        e.preventDefault();
        const infoUser = {
            username: userName,
            password: password,
            role: role
        }
        await UsersManager.registerEmployees(infoUser, setCreated, setNotCreated, setErrors)

    }

    return (<>

        <div className='containerLogReg'>

            <div className="logITitleReg">
                <p className='logInTextReg'>
                    REGISTRO EMPLEADOS
                </p>
            </div>
            <div className='formDivReg'>
                <form className='formRegi' onSubmit={RegisterUser}>
                    <img className='userImg' src='https://cdn-icons-png.flaticon.com/512/3899/3899618.png' alt='NOT FOUND' />

                    <input className='userInput' type="text" id="employeeUser"
                        name="employeeemail" placeholder="Introduzca usuario" onChange={(e) => setUserName(e.target.value)} />

                    <input className='passwordInput' type="password" id="emailOrder"
                        name="empPass" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

                    <select className='selectRole' name="role" id="emailOrder" onChange={(e) => setRole(e.target.value)}>
                        <option value=""></option>
                        <option value="chef">Chef</option>
                        <option value="waiter">Camarero</option>
                    </select>

                    <div> <input className='signInBtn' type="submit" value="REGISTRAR" />
                        <input className='returnButton' value="VOLVER" onClick={() => navigate(-1)} />
                    </div>



                </form>
            </div>
        </div>
        {created && <Modal title={""} text={"Se ha creado al usuario correctamente"} style={"btnModalEmployees"} textErrors={errors} route={() => navigate('/employees')} />}
        {notCreated && <Modal title={"Ha ocurrido un error"} textErrors={errors} style={"btnModalEmployees"} route={() => setNotCreated(!notCreated)} />}



    </>)

}


export default RegisterEmployees;

