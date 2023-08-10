import { BsTrashFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrder,
  removeOrder,
  setSelectedFood,
  updateOrder,
} from '../../redux/orderListSlice';
import './FoodModal.scss';

function FoodModal({ editing = false, closeModal }) {
  const selectedFood = useSelector((state) => state.order.selectedFood);
  const dispatch = useDispatch();

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

  return (
    <>
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
        {!editing && (
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

        {editing && (
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
    </>
  );
}
export default FoodModal;
