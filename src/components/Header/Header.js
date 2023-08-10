import { useState } from 'react';
import { BiCart, BiSolidUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import OrderList from '../OrderList/OrderList';
import './Header.scss';

function Header() {
  const order = useSelector((state) => state.order.items);
  const [isCartShown, setIsCartShown] = useState(false);
  return (
    <header className="header">
      <ul className="menu">
        {isCartShown && (
          <div className="cartContainer">
            <OrderList closeBtn={true} setIsCartShown={setIsCartShown} />
          </div>
        )}
        <li>
          <h1 className="logo">TsäTng</h1>
        </li>
        <li className="menuLink user">
          <BiSolidUserCircle />
          <p>宜庭</p>
        </li>
        <li onClick={() => setIsCartShown(true)} className="menuLink">
          <BiCart />
          <div className="orderNum">
            {order.reduce((acc, val) => acc + val.qty, 0)}
          </div>
        </li>
      </ul>
    </header>
  );
}
export default Header;
