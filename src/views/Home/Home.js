import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import OrderList from '../../components/OrderList/OrderList';
import banner from '../../images/banner.jpg';
import { fetchFoodData } from '../../redux/homeFoodApi';
import { initOrder } from '../../redux/orderListApi';
import { ENUM_FOOD_TYPE } from '../../utils/dataConstants';
import './Home.scss';
import Category from './components/Category';

function Home() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const categoryRefs = useRef({});
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const food = useSelector((state) => state.api.food);

  useEffect(() => {
    dispatch(fetchFoodData());
  }, [dispatch]);

  useEffect(() => {
    const savedOrderJSON = localStorage.getItem('orderList');
    const savedOrder = JSON.parse(savedOrderJSON) || [];
    dispatch(initOrder(savedOrder));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(order));
  }, [order]);

  const scrollToCategory = (category) => {
    const categoryRef = categoryRefs.current[category];
    categoryRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  function uniqueTypes() {
    const uniqueTypes = new Set(food.map((item) => item.group));
    return Array.from(uniqueTypes);
  }
  return (
    <section className="home">
      <main className="menu">
        <img
          src={banner}
          className="banner"
          alt="banner"
          width="100%"
          height="450"
        />
        {food.length === 0 && (
          <div className="noFoodData">Sorry! Something went wrong</div>
        )}
        {food.length !== 0 && (
          <>
            <div className="categoryNav scroll">
              <ul className="container categoryBtns">
                {uniqueTypes().map((item) => (
                  <li
                    className="categoryBtn"
                    key={ENUM_FOOD_TYPE[item].ID}
                    onClick={() => scrollToCategory(item)}>
                    {ENUM_FOOD_TYPE[item].TITLE}
                  </li>
                ))}
              </ul>
            </div>
            <Category
              setSelectedFood={setSelectedFood}
              setShowPopup={setShowPopup}
              categoryRefs={categoryRefs}
            />
          </>
        )}
      </main>
      {showPopup && selectedFood && (
        <Modal
          selectedFood={selectedFood}
          setSelectedFood={setSelectedFood}
          setShowPopup={setShowPopup}
        />
      )}
      <aside className="sideContainer">
        <OrderList />
      </aside>
    </section>
  );
}
export default Home;
