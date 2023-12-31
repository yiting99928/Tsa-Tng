import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodData } from '../../api/homeFoodApi';
import Loading from '../../components/Loading/Loading';
import OrderList from '../../components/OrderList/OrderList';
import banner from '../../images/banner.jpg';
import { ENUM_FOOD_TYPE } from '../../utils/dataConstants';
import './Home.scss';
import Category from './components/Category';

function Home() {
  const categoryRefs = useRef({});
  const dispatch = useDispatch();
  const api = useSelector((state) => state.api);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFoodData());
  }, [dispatch]);

  useEffect(() => {
    if (api.status === 'loading') {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [api.status]);

  const scrollToCategory = (category) => {
    const categoryRef = categoryRefs.current[category];
    categoryRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  function uniqueTypes() {
    const uniqueTypes = new Set(api.food.map((item) => item.group));
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
        {isLoading && <Loading />}
        {!isLoading && api.food.length === 0 && (
          <div className="noFoodData">Sorry! Something went wrong</div>
        )}
        {!isLoading && api.food.length !== 0 && (
          <>
            <div className="categoryNav scroll">
              <ul className="container categoryBtns">
                {uniqueTypes().map((item) => (
                  <li
                    className="categoryBtn"
                    key={ENUM_FOOD_TYPE[item]}
                    onClick={() => scrollToCategory(item)}>
                    {ENUM_FOOD_TYPE[item]}
                  </li>
                ))}
              </ul>
            </div>
            <Category categoryRefs={categoryRefs} />
          </>
        )}
      </main>
      <aside className="sideContainer">
        <OrderList />
      </aside>
    </section>
  );
}
export default Home;
