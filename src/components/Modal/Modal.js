import { useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux/orderListApi';
import './Modal.scss';

function Modal({ selectedFood, setShowPopup, setSelectedFood }) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  function addOrder() {
    dispatch(createOrder(selectedFood));
    setShowPopup(false);
  }

  return (
    <>
      <div className="modalContainer" onClick={() => setShowPopup(false)} />
      <div className="popup">
        <img
          src={selectedFood.img}
          alt={selectedFood.name}
          width="100%"
          height="100"
          className="foodImg"
        />
        <div className="closeBtn">
          <MdOutlineClose onClick={() => setShowPopup(false)} />
        </div>
        <div className="titleContainer">
          <p className="popUpTitle">{selectedFood.name}</p>
          <p>${selectedFood.price}</p>
        </div>
        <p className="popUpDescription">{selectedFood.description}</p>

        <div>
          <p>餐點備註</p>
          <textarea
            name="orderNote"
            rows={3}
            cols={30}
            value={selectedFood.note}
            onChange={(e) =>
              setSelectedFood({
                ...selectedFood,
                note: e.target.value,
              })
            }
          />
        </div>
        <div className="addToCartContainer">
          <input
            className="addOrderNum"
            type="number"
            min="1"
            value={selectedFood.qty}
            onChange={(e) =>
              setSelectedFood({
                ...selectedFood,
                qty: Number(e.target.value),
              })
            }
          />
          <button onClick={addOrder} className="addToCartBtn">
            放入購物車
          </button>
        </div>
      </div>
    </>
  );
}
export default Modal;
