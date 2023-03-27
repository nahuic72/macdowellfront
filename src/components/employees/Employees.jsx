import OrdersList from './OrdersList';
import Navbar from "./Navbar";
import '../../assets/employees/employees.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from "../../context/User";
import { useNavigate } from 'react-router-dom';
import NewUser from './NewUser';
import UsersManager from '../../services/user.Api';
import OrdersManager from '../../services/order.Api';


function Employees() {
  const navigate = useNavigate()

  const contextUser = useUserContext();
  const [status, setStatus] = useState([]);
  const [access, setAccess] = useState([]);
  const [update, setUdate] = useState(false);

  const id_user = contextUser.user.id_user

  useEffect(() => {
    const getAccess = async () => {
      await UsersManager.getAccess(setAccess, id_user)
    }
    getAccess()
  }, [id_user])


  useEffect(() => {
    const getStatus = async () => {
      await OrdersManager.getStatusOrders(setStatus, access)
    }
    getStatus();
  }, [access])



  return (
    <div className='container-employees'>
      <div className="navEmpl">
        <Navbar />
      </div>
      <div className='btnAddNew' onClick={() => navigate('/admin/register-employeers')}>
        <NewUser />
      </div>
      <br />
      {status.map((statu) => (
        <OrdersList statu={statu} update={() => setUdate(!update)} refresh={update} />
      ))}

    </div>


  );
}

export default Employees;