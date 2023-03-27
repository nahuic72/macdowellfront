import { useState } from 'react';
import '../../assets/employees/orderCard.css';
import axios from 'axios'
import { useUserContext } from '../../context/User';
import OrdersManager from '../../services/order.Api';



const OrdersCard = ({ ordersDetail, filtered, update }) => {

  const contexUser = useUserContext()

  let status = '';

  const nextStatus = async (one) => {

    const token = contexUser.user.token
    /*const authAxios = axios.create({
      headers: {
        authorization: token
      }
    })*/

    if (status !== 5) {
      //await authAxios.patch(`${process.env.REACT_APP_API_URL}/orders/status/${one}`)
      OrdersManager.patchOrderDetails(token, one)
      update()
    }
  }

  return (
    <>
      {filtered.map(one => (
        <div className="card_container">
          <div className="card">
            <div className="numOrder">
              <p className='orderNum'>Num order: {one}</p>
            </div>
            {ordersDetail.filter(orderDetail => (orderDetail.id_order === one))
              .map(order =>
                <>
                  <p className='none'>{status = order.id_status}</p>
                  <p className="orderName"> •{order.name}</p>
                  <p className="productQ">Cantidad: {order.units}</p>

                </>

              )}
          </div>
          {(contexUser.user.role === "admin" && status !== 5) ||
            (contexUser.user.role === "waiter" && status !== 5) ||
            (contexUser.user.role === "chef" && status !== 3) ?
            <button className='next' onClick={() => nextStatus(one)}>NEXT STATUS</button> : <></>}
          <p className='divisor'>--------------------</p>
        </div>
      ))
      }
    </>
  )
}

export default OrdersCard;