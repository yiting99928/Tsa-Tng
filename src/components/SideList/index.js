import { BsTrashFill } from 'react-icons/bs';
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeOrder, updateOrder } from '../../redux/orderSlice';
import './SideList.scss';

function SideList() {
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

  return (
    <aside className="sideList">
      <div className="orderItems">
        <h3>您的訂單</h3>
        {order.length === 0 && (
          <div className="noOrder">
            購物車還沒有任何物品
            <br />
            立即開始訂購喜愛的產品吧！
          </div>
        )}
        {order.length !== 0 && (
          <ul>
            {order.map((item) => (
              <li key={item.name + item.note}>
                {item.name}
                <br />
                {item.note && (
                  <div>
                    {item.note}
                    <br />
                  </div>
                )}
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
                <br />${item.price * item.qty}
                <br />
                <br />
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
    </aside>
  );
}
export default SideList;
