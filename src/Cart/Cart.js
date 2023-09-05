import "./Cart.css"

function Cart({handleCartClick, cart}) {
  const cartClickHandler = (e) =>{
    console.log(cart.length);
    if( e.target === e.currentTarget ){
      handleCartClick();
    } 
  }

  return (
    <div className="cart-container" onClick={cartClickHandler}>
      <div className="cart">
        {cart.map(item=>(
          <div key={item.id}>
             <h1 >{item.name}</h1>
             <p>{item.amount}</p>
          </div>
         
        ))}
      </div>
    </div>
  )
}

export default Cart