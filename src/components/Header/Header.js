import { BiCart, BiSolidUserCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showCart } from '../../redux/infoApi';
import OrderList from '../OrderList/OrderList';
import './Header.scss';

function Header() {
  const order = useSelector((state) => state.order.items);
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();

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
        {info.isShowCart && (
          <div className="cartContainer">
            <OrderList />
          </div>
        )}
        <li onClick={() => dispatch(showCart())} className="headerLink">
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
