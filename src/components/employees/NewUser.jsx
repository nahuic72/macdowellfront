import '../../assets/employees/newUser.css';
import { useUserContext } from '../../context/User';



const NewUser = () => {

    const contexUser = useUserContext()


    return (
        <>
            {contexUser.user.role !== "admin" ? <></> :
                <button className='addNewEmplo'>AÑADIR USUARIO</button>}
        </>
    )
}

export default NewUser