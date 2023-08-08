import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Checkout.scss';

function Checkout() {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const order = useSelector((state) => state.order.items);

  return (
    <div className="checkout container">
      <div className="orderInfo">
        訂餐詳情
        <ul>
          {order.map((item) => (
            <li key={item.time}>
              <p>{item.name}</p>
              <p>{item.note}</p>
              <p>{item.qty}</p>
              <p>${item.price * item.qty}</p>
              <br />
            </li>
          ))}
        </ul>
        <br />
        取餐時間:
        {/* {new Date().getMinutes} */}
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
        <br />
        <div>取餐地址:</div>
        <form>
          <div>
            <label htmlFor="name">取餐人姓名</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={() => setUser(user.name)}
              value={user.name}
            />
          </div>
          <div>
            <label htmlFor="email">取餐人電子信箱</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={() => setUser(user.email)}
              value={user.email}
            />
          </div>
          <div>
            <input type="submit" value="送出訂單" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Checkout;
