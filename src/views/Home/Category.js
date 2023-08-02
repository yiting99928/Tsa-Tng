import React, { useEffect, useState } from 'react';
import './Category.scss';

function Category({ setSelectedFood, setShowPopup, categoryRefs }) {
  const [food, setFood] = useState([]);
  const apiUrl = 'http://localhost:3000';

  const handleFoodItemClick = (item) => {
    setSelectedFood({ ...item, qty: 1 });
    setShowPopup(true);
  };
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

  return (
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
