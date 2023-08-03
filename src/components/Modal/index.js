import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux/orderSlice';
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
        <AiOutlineCloseCircle onClick={() => setShowPopup(false)} />
        <h2>{selectedFood.name}</h2>
        <p>{selectedFood.description}</p>
        <p>價格：${selectedFood.price}</p>
        <input
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
        <p>
          備註
          <br />
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
        </p>
        <button onClick={addOrder}>確定</button>
      </div>
    </>
  );
}
export default Modal;
