import './Checkout.scss';

function Checkout() {
  function handleInputChange() {
    console.log(123);
  }
  return (
    <div className="checkout">
      <div className="orderInfo">
        訂餐詳情
        <br />
        取餐時間:
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
        <select>
          <option></option>
          <option></option>
          <option></option>
        </select>
        <br />
        <div>
          取餐地址:
          <img />
        </div>
        <form>
          <div>
            <label for="name">Enter your name: </label>
            <input type="text" name="name" id="name" required />
          </div>
          <div>
            <label for="email">Enter your email: </label>
            <input type="email" name="email" id="email" required />
          </div>
          <div>
            <input type="submit" value="Subscribe!" />
          </div>
        </form>
        <form>
          <input value="123" onChange={handleInputChange} />
          <input value="123" onChange={handleInputChange} />
          <input value="123" onChange={handleInputChange} />
          <input value="123" onChange={handleInputChange} />
          <input value="123" onChange={handleInputChange} />
        </form>
      </div>
      <div>
        你的訂單
        <br />
        TsäTng 早午餐
        <br />
        <ul>
          <li>蔥抓餅加蛋</li>
          <li>蔥抓餅加蛋</li>
          <li>蔥抓餅加蛋</li>
          <li>蔥抓餅加蛋</li>
        </ul>
        總計 $666
      </div>
    </div>
  );
}
export default Checkout;
