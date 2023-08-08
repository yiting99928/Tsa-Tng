import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showPopUp } from '../../../redux/infoStateApi';
import { setSelectedFood } from '../../../redux/orderListApi';
import { ENUM_FOOD_TYPE } from '../../../utils/dataConstants';
import './Category.scss';

function Category({ categoryRefs }) {
  const food = useSelector((state) => state.api.food);
  const dispatch = useDispatch();

  const handleFoodItemClick = (item) => {
    if (item.qty === 0) return;
    dispatch(setSelectedFood({ ...item, qty: 1 }));
    dispatch(showPopUp());
  };
  const organizedFoodData = food.reduce((acc, item) => {
    // acc 預設為 {} 若acc中沒有該 key 則賦予這個key一個空陣列
    // 將item push進對應的 acc array 中
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <div className="categories">
      {Object.entries(organizedFoodData).map(([type, items]) => (
        <div
          className="menuCategory"
          key={type}
          ref={(ref) => (categoryRefs.current[type] = ref)}>
          {/* 使 callback 是為了在掛載時，可能還沒有渲染出相應的分類區塊，此時直接設置引用可能會導致引用變量為 null 或 undefined。 */}
          <h3 className="container cardsTitle">{ENUM_FOOD_TYPE[type].TITLE}</h3>
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
    </div>
  );
}
export default Category;
