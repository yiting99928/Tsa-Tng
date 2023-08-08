import { useEffect } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { closePopUp } from '../../redux/infoApi';

import {
  createOrder,
  removeOrder,
  setEditing,
  setSelectedFood,
  updateOrder,
} from '../../redux/orderListApi';
import './Modal.scss';

function Modal() {
  const dispatch = useDispatch();
  const selectedFood = useSelector((state) => state.order.selectedFood);
  const isEditing = useSelector((state) => state.order.isEditing);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  function addOrder() {
    if (selectedFood.qty === 0) return;
    dispatch(createOrder({ ...selectedFood, time: new Date().getTime() }));
    closeModal();
  }

  function editOrder() {
    if (selectedFood.qty === 0) return;
    dispatch(updateOrder(selectedFood));
    closeModal();
  }

  function deleteOrder() {
    dispatch(removeOrder(selectedFood));
    closeModal();
  }
  function closeModal() {
    dispatch(closePopUp());
    dispatch(setEditing(false));
  }

  return (
    <>
      <div className="modalContainer" onClick={closeModal} />
      <div className="popup">
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

        <div>
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
        </div>
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
          {!isEditing && (
            <button
              onClick={addOrder}
              className={
                selectedFood.qty === 0
                  ? 'addToCartBtn defaultAddCartBtn'
                  : 'addToCartBtn'
              }>
              放入購物車
            </button>
          )}
          {isEditing && (
            <div className="addToCartContainer">
              <button onClick={deleteOrder} className="trashBtn">
                <BsTrashFill />
              </button>
              <button
                onClick={editOrder}
                className={
                  selectedFood.qty === 0
                    ? 'addToCartBtn defaultAddCartBtn'
                    : 'addToCartBtn'
                }>
                修改訂單
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Modal;
