import { useState } from 'react';
import { BiCart, BiSolidUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderList from '../OrderList/OrderList';
import './Header.scss';

function Header() {
  const order = useSelector((state) => state.order);
  const [showCart, setShowCart] = useState(false);

  function openCart() {
    setShowCart(!showCart);
  }
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="./">TsäTng</Link>
      </h1>
      <ul className="topBar">
        <li className="headerLink">
          <BiSolidUserCircle />
          宜庭
        </li>
        {showCart && (
          <div className="cart">
            <OrderList openCart={openCart} />
          </div>
        )}
        <li onClick={openCart} className="headerLink">
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
