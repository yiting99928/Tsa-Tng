import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initOrder } from './redux/orderListSlice';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './utils/_global.scss';
import './utils/_reset.scss';
import Home from './views/Home/Home';

function App() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.items);
  useEffect(() => {
    const savedOrderJSON = localStorage.getItem('orderList');
    const savedOrder = JSON.parse(savedOrderJSON) || [];
    dispatch(initOrder(savedOrder));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(order));
  }, [order]);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
