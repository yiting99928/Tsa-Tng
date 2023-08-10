import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import { createOrder, setSelectedFood } from '../../../redux/orderListApi';
import { ENUM_FOOD_TYPE } from '../../../utils/dataConstants';
import './Category.scss';

function Category({ categoryRefs }) {
  const food = useSelector((state) => state.api.food);
  const selectedFood = useSelector((state) => state.order.selectedFood);
  const dispatch = useDispatch();
  const [isModalShown, setIsModalShown] = useState(false);

  const handleFoodItemClick = (item) => {
    if (item.qty === 0) return;
    dispatch(setSelectedFood({ ...item, qty: 1 }));
    setIsModalShown(true);
  };
  const organizedFoodData = food.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});

  function closeModal() {
    setIsModalShown(false);
    dispatch(setSelectedFood(null));
  }

  function addOrder() {
    if (selectedFood.qty === 0) return;
    dispatch(createOrder({ ...selectedFood, time: new Date().getTime() }));
    closeModal();
  }

  return (
    <div className="categories">
      {Object.entries(organizedFoodData).map(([type, items]) => (
        <div
          className="menuCategory"
          key={type}
          ref={(ref) => (categoryRefs.current[type] = ref)}>
          {/* 使 callback 是為了在掛載時，可能還沒有渲染出相應的分類區塊，此時直接設置引用可能會導致引用變量為 null 或 undefined。 */}
          <h3 className="container cardsTitle">{ENUM_FOOD_TYPE[type]}</h3>
          <ul className="menuCards container">
            {items.map((item) => (
              <li
                key={item.id}
                className="card"
                onClick={() => handleFoodItemClick(item)}>
                {item.qty === 0 && <div className="saleOut">售完</div>}
                <div className="itemDetail">
                  <p className="itemTitle">{item.name}</p>
                  <p className="itemDescription">{item.description}</p>
                  <p className="itemPrice">${item.price}</p>
                </div>
                <img src={item.img} alt="breakfast" width="70" height="70" />
              </li>
            ))}
          </ul>
        </div>
      ))}
      {isModalShown && (
        <Modal setIsModalShown={setIsModalShown}>
          <img
            src={selectedFood.img}
            alt={selectedFood.name}
            width="100%"
            height="100"
            className="foodImg"
          />
          <div className="closeBtn">
            <MdOutlineClose onClick={closeModal} />
          </div>
          <div className="titleContainer">
            <p className="popUpTitle">{selectedFood.name}</p>
            <p>${selectedFood.price}</p>
          </div>
          <p className="popUpDescription">{selectedFood.description}</p>

          <p>餐點備註</p>
          <textarea
            name="orderNote"
            rows={3}
            cols={30}
            value={selectedFood.note}
            onChange={(e) =>
              dispatch(
                setSelectedFood({
                  ...selectedFood,
                  note: e.target.value,
                })
              )
            }
          />
          <div className="addToCartContainer">
            <input
              className="addOrderNum"
              type="number"
              min="1"
              value={selectedFood.qty}
              onChange={(e) =>
                dispatch(
                  setSelectedFood({
                    ...selectedFood,
                    qty: Number(e.target.value),
                  })
                )
              }
            />
            <button
              onClick={addOrder}
              className={
                selectedFood.qty === 0
                  ? 'addToCartBtn defaultAddCartBtn'
                  : 'addToCartBtn'
              }>
              放入購物車
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Category;
