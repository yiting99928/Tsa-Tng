import React from 'react';
import { useSelector } from 'react-redux';
import './Category.scss';

function Category({ setSelectedFood, setShowPopup, categoryRefs }) {
  const food = useSelector((state) => state.api.food);
  const handleFoodItemClick = (item) => {
    if (item.qty !== 0) {
      setSelectedFood({ ...item, qty: 1 });
      setShowPopup(true);
    }
  };
  const organizedFoodData = food.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  // console.log(organizedFoodData);

  return (
    <div className="categories">
      {Object.entries(organizedFoodData).map(([type, items]) => (
        <div
          className="menuCategory"
          key={type}
          ref={(ref) => (categoryRefs.current[type] = ref)}>
          <h2 className="container">{type}</h2>
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
