import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import OrderList from '../../components/OrderList/OrderList';
import banner from '../../images/banner.jpg';
import { fetchFoodData } from '../../redux/homeFoodApi';
import { ENUM_FOOD_TYPE } from '../../utils/dataConstants';
import './Home.scss';
import Category from './components/Category';

function Home() {
  const categoryRefs = useRef({});
  const dispatch = useDispatch();
  const food = useSelector((state) => state.api.food);
  const info = useSelector((state) => state.info);

  useEffect(() => {
    dispatch(fetchFoodData());
  }, [dispatch]);

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
            <Category categoryRefs={categoryRefs} />
          </>
        )}
      </main>
      {info.isShowPopup && (
        <Modal>
          {/* <>
            <div>123</div>
            <div>123</div>
          </> */}
        </Modal>
      )}
      <aside className="sideContainer">
        <OrderList />
      </aside>
    </section>
  );
}
export default Home;
