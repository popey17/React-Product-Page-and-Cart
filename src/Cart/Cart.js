import "./Cart.css"

function Cart({handleCartClick, cart, clearCart,increaseQuantity,decreaseQuantity}) {

  const cartClickHandler = (e) =>{
    console.log(cart);
    if( e.target === e.currentTarget ){
      handleCartClick();
    } 
  }

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price,
      0
    );
  };
  
  const totalPrice= calculateTotalPrice();

  return (
    <div className="cart-container" onClick={cartClickHandler}>
      <div className="cart">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="clear-btn" onClick={clearCart}>remove all</button>
        </div>
        <div className="cart-item-container">
          <div className="cart-items">
          {cart.map(item=>(
            <div className="cart-item" key={item.id}>
                <div className="img-container">
                  <img src={`https://items.aura.biocaremm.com/${item.img}`} alt="" />
                </div>
                <div className="name">
                  <p >{item.name}</p>
                </div>
                <div className="amount-container">
                  <button onClick={()=>increaseQuantity(item.id)}> + </button>
                  <p>{item.amount}</p>
                  <button onClick={()=>decreaseQuantity(item.id)}> - </button>
                </div>
                <div className="price">
                  {(item.price).toLocaleString("en-US")}
                </div>
            </div>
          ))}
          </div>
        </div>
        <div className="cart-footer">
          <div className="footer-content">
            <p>total price</p>
            <p className="total-price">{totalPrice.toLocaleString("en-US")}</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Cart