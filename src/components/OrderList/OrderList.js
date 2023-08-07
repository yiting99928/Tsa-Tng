import { BsTrashFill } from 'react-icons/bs';
import {
  MdOutlineAddCircle,
  MdOutlineClose,
  MdOutlineRemoveCircle,
} from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeOrder, updateOrder } from '../../redux/orderListApi';
import './OrderList.scss';

function OrderList({ openCart }) {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);

  function deleteOrder(e, id) {
    e.stopPropagation();
    dispatch(removeOrder(id));
  }
  function editOrder(e, item, newQty) {
    e.stopPropagation();
    dispatch(updateOrder({ ...item, qty: newQty }));
  }
  // console.log(order);
  return (
    <div className="orderList">
      {openCart && (
        <div className="closeBtn" onClick={openCart}>
          <MdOutlineClose />
        </div>
      )}
      <h3 className="orderTitle">您的訂單</h3>
      {order.length === 0 && (
        <div className="noOrder">
          購物車還沒有任何物品
          <br />
          立即開始訂購喜愛的產品吧！
        </div>
      )}
      {order.length !== 0 && (
        <ul className="orderItems scroll">
          {order.map((item) => (
            <li key={item.name + item.note} className="orderItem">
              <div className="orderDetail">
                <h4>{item.name}</h4>
                <div className="itemNum">
                  {item.qty === 1 ? (
                    <BsTrashFill onClick={(e) => deleteOrder(e, item.id)} />
                  ) : (
                    <MdOutlineRemoveCircle
                      onClick={(e) => editOrder(e, item, item.qty - 1)}
                    />
                  )}
                  {item.qty}
                  <MdOutlineAddCircle
                    onClick={(e) => editOrder(e, item, item.qty + 1)}
                  />
                </div>
              </div>
              <div className="orderDetail">
                <div className="note">
                  {item.note && <div>{item.note}</div>}
                </div>
                <p>${item.price * item.qty}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="total">
        <p className="totalItemNum">
          共計{order.reduce((acc, val) => acc + val.qty, 0)}件
        </p>
        <p className="totalPrice">
          <span>總計$</span>
          <span>
            {order.reduce((acc, val) => acc + val.price * val.qty, 0)}
          </span>
          <span>TWD</span>
        </p>
      </div>
      <button className="checkoutBtn">
        <Link to="./checkout">結帳</Link>
      </button>
    </div>
  );
}
export default OrderList;