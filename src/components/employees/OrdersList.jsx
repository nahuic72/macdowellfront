import { useEffect, useState } from 'react';
import axios from 'axios';
import OrdersCard from "./OrdersCard";
import '../../assets/employees/ordersList.css';
import OrdersManager from '../../services/order.Api';

const OrdersList = ({ statu, update, refresh }) => {

  const [ordersDetail, setOrdersDetail] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState(statu.id_status); // nuevo estado
  const [updateList, setUpdateList] = useState(false)

  useEffect( () => {
    OrdersManager.getOrdersDetail(statu.id_status,setOrdersDetail)
    /*const getOrdersDetail = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/ordersDetail/${statu.id_status}`);
      setOrdersDetail(response.data);
    }
    getOrdersDetail(); */
    getNewOrdersList()
  }, [status, refresh])

  useEffect(() => {
    let numbers = [];
    for (let i = 0; i < ordersDetail.length; i++) {
      numbers.push(ordersDetail[i].id_order)
    };
    setFiltered([...new Set(numbers)]);
  }, [ordersDetail]);

  useEffect(() => {
    update()
  }, [updateList])

  const getNewOrdersList = () => {
    setTimeout(() => {
      setUpdateList(!updateList)
    }, 10000);
  }

  return (
    <div className="container-card">
      <div className='title-order'>
        <p className='title'>{statu.description}</p>
      </div>
      <div className='statusDiv'>
        <OrdersCard ordersDetail={ordersDetail} filtered={filtered} update={() => setUpdateList(!updateList)} />
      </div>
    </div>
  )
}

export default OrdersList;