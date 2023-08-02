import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import banner from '../../assets/banner.jpg';
import Modal from '../../components/Modal';
import { initOrder } from '../../redux/orderSlice';
import './Home.scss';
import SideList from './SideList';

function Home() {
  const [food, setFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null); // 追蹤選擇的餐點
  const [showPopup, setShowPopup] = useState(false); // 控制彈窗
  const dispatch = useDispatch();
  const apiUrl = 'http://localhost:3000';
  const order = useSelector((state) => state.order);
  const categoryRefs = useRef({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/breakfasts`);
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const savedOrderJSON = localStorage.getItem('orderList');
    const savedOrder = JSON.parse(savedOrderJSON) || [];
    dispatch(initOrder(savedOrder));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(order));
  }, [order]);

  const handleFoodItemClick = (item) => {
    setSelectedFood({ ...item, qty: 1 });
    setShowPopup(true);
  };

  const scrollToCategory = (category) => {
    const categoryRef = categoryRefs.current[category];
    categoryRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  return (
    <section className="home">
      {food && (
        <main className="menu">
          <img
            src={banner}
            className="banner"
            alt="banner"
            width="100%"
            height="450"
          />
          <div className="categoryNav">
            <ul className="container categoryBtns">
              {Object.keys(food).map((item) => (
                <li
                  className="categoryBtn"
                  key={item}
                  onClick={() => scrollToCategory(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="categories">
            {Object.entries(food).map(([type, items]) => (
              <div className="menuCategory" key={type}>
                <h2
                  className="container"
                  ref={(ref) => (categoryRefs.current[type] = ref)}>
                  {type}
                </h2>
                <ul className="menuCards container">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="card"
                      onClick={() => handleFoodItemClick(item)}>
                      <div className="itemDetail">
                        <p className="itemTitle">{item.name}</p>
                        <p className="itemDescription">{item.description}</p>
                        <p className="itemPrice">${item.price}</p>
                      </div>
                      <img
                        src={item.img}
                        alt="breakfast"
                        width="70"
                        height="70"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
      )}
      {showPopup && selectedFood && (
        <Modal
          selectedFood={selectedFood}
          setSelectedFood={setSelectedFood}
          setShowPopup={setShowPopup}
        />
      )}
      <SideList />
    </section>
  );
}
export default Home;
