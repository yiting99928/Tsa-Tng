import { BiCart, BiSolidUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  const order = useSelector((state) => state.order);
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="./">TsäTng</Link>
      </h1>
      <ul className="topBar">
        <li>
          <BiSolidUserCircle />
          宜庭
        </li>
        <li>
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
