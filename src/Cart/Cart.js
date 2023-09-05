import "./Cart.css"

function Cart({handleCartClick}) {
  const cartClickHandler = (e) =>{
    if( e.target === e.currentTarget ){
      handleCartClick();
    }
    
  }

  return (
    <div className="cart-container" onClick={cartClickHandler}>
      <div className="cart">

      </div>
    </div>
  )
}

export default Cart