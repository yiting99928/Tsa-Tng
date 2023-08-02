import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import SideList from '../../components/SideList';
import banner from '../../images/banner.jpg';
import { initOrder } from '../../redux/orderSlice';
import Category from './Category';
import './Home.scss';

function Home() {
  const [food, setFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
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

          <Category
            setSelectedFood={setSelectedFood}
            setShowPopup={setShowPopup}
            categoryRefs={categoryRefs}
          />
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
