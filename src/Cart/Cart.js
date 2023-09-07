import "./Cart.css"
import html2canvas from "html2canvas";
import {AiOutlinePlusCircle, AiOutlineMinusCircle,AiOutlineClose} from "react-icons/ai"
import {MdRemoveShoppingCart} from 'react-icons/md'

// const takeScreenShot = ()=> {
//   const element = document.getElementById('areaToTakeSS');
//   if(!element) {
//     return;
//   }
//   html2canvas(element).then((canvas)=>{
//     let img = canvas.toDataURL('image/jpeg');
//     console.log(img);
//     const a = document.createElement('a');
//     a.href = img;
//     a.download = 'caputure.jpeg'
//     a.click();
//   }).catch(err=>{
//     console.log('cannot take ss');
//   })

// }

const takeScreenShot = () => {
    html2canvas(document.querySelector('#areaToTakeSS'),{ 
    useCORS: true,
    allowTaint:true, })
    .then((canvas)=>{
    let img = canvas.toDataURL('image/jpeg',0.9);
    console.log(img);
    const a = document.createElement('a');
    a.href = img;
    a.download = 'caputure.jpeg'
    a.click();
    });
}

function Cart({handleCartClick, cart, clearCart,increaseQuantity,decreaseQuantity, handleRemove}) {

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
      <div className="cart" id="areaToTakeSS">
        <div className="close-Btn" >
          <AiOutlineClose onClick={handleCartClick} />
        </div>
        <div className="cartcontainer">
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="clear-btn" onClick={clearCart}>remove all</button>
        </div>
        <div className="cart-item-container">
          
          <div className="cart-items" >
          {cart.map(item=>(
            <div className="cart-item" key={item.id}>
                <div className="img-container">
                  <img src={`https://items.aura.biocaremm.com/${item.img}`} alt="" />
                </div>
                <div className="name">
                  <p >{item.name}</p>
                </div>
                <div className="amount-container">
                    <AiOutlinePlusCircle onClick={()=>increaseQuantity(item.id)}/>
                  <p>{item.amount}</p>
                    <AiOutlineMinusCircle onClick={()=>decreaseQuantity(item.id)}/>
                </div>
                <div className="price">
                  {(item.price).toLocaleString("en-US")}
                </div>
                <button className="removeBtn" onClick={()=>handleRemove(item.id)}><span>remove</span><MdRemoveShoppingCart/></button>
            </div>
          ))}
          </div>
        </div>
        <div className="cart-footer">
          <div className="footer-content">
            <p>Total Price</p>
            <p className="total-price">{totalPrice.toLocaleString("en-US")}</p>
          </div>
        </div>

        <div className="screenshot-btn-container">
          <button className="screenshot-btn" onClick={takeScreenShot}>Save</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Cart