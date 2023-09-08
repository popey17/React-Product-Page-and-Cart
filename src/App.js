import Nav from "./Nav/Nav";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductPage from "./Products/ProductPage";
import LandingPage from "./LandingPage/LandingPage";
import Cart from "./Cart/Cart";

function App() {
  const [productData, SetProductData] = useState([]);
  const [category,setCategory] = useState('');
  const [cart,setCart] = useState([]);
  const [isShowNav, setIsShowNav] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [isError , setIsError] = useState(false)
  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';

  useEffect(()=>{
    fetchProductData()
    fetchCategoryData()
   },[]);

   async function fetchProductData() {
    try{
      const response = await fetch ('https://items.aura.biocaremm.com/api/products', {
        method: 'GET',
        mode:'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Authorization': `Bearer ${Token}`,
        },
      });

      if(!response) {
        throw new Error('error fetching data');
      }

      const responseData = await response.json();
      SetProductData (responseData);

    }catch (error) {
      console.error(error);
      SetProductData ([]);
    }
  };



   async function fetchCategoryData() {
    try{
      const response = await fetch ('https://items.aura.biocaremm.com/api/categories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Token}`,
        },
      });
  

      if(!response) {
        throw new Error('error fetching data');
      }

      const responseData = await response.json();
      setCategoryData (responseData);

    }catch (error) {
      console.error(error);
      setCategoryData ([]);
    }
  }


  const handleQuery = (e) => {
    setCategory(e.target.value)
  }

  const handleCart = (item) => {
    let isPresnt = false;
    cart.forEach((product)=>{
      if (item.id === product.id)
      isPresnt = true;
      // console.log(isPresnt);
    })

    if(isPresnt) {
      setIsError(true);
      setTimeout(()=>{
        setIsError(false);
      },2000)
    }else {
      setCart([...cart,item])
    }
  }

  const handleCartClick = () => {
    setIsShowNav(!isShowNav);
  }

  const clearCart = () => {
    setCart([]);
  }

  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        const singlePrice = item.price/item.amount;
        const updatedAmount = item.amount + 1;
        const updatedPrice = item.price + singlePrice;
        return { ...item, amount: updatedAmount,price: updatedPrice };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.amount > 1) {
        const singlePrice = item.price/item.amount;
        const updatedAmount = item.amount - 1;
        const updatedPrice = item.price - singlePrice;
        return { ...item, amount: updatedAmount, price: updatedPrice };
      }
      return item;
    });
    setCart(updatedCart);
  };



  return (
    <>
    <BrowserRouter>
      { isShowNav && <Cart  handleCartClick={handleCartClick} cart={cart} clearCart={clearCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/> }
      <Nav handleCartClick={handleCartClick} cart={cart}/>
    <Routes >
    <Route path="/"  element={<LandingPage/>}/>
      <Route path="/products" element={<ProductPage productData={productData} handleQuery={handleQuery} category={category} handleCart={handleCart} categoryData={categoryData} isError={isError}/>}>
      </Route>
    </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
