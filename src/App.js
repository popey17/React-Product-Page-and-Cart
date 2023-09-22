import Nav from "./Nav/Nav";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductPage from "./Products/ProductPage";
import LandingPage from "./LandingPage/LandingPage";
import Cart from "./Cart/Cart";

function App() {
  const [category,setCategory] = useState('');
  const [cart,setCart] = useState([]);
  const [isShowNav, setIsShowNav] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [query, setQuery] = useState('');
  // const [isPresnt, setIsPresent] = useState(false);
  const [isError, setIsError] = useState(false)

  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';

  useEffect(()=>{
    fetchCategoryData()
  },[]);


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
    setQuery(e.target.value)
  }

  const handleCategoryQuery= (e) => {
    setCategory(e.target.value)
  }

  const handleCart = (item) => {
    let isPresnt = false;
    cart.forEach((product)=>{
      if (item.id === product.id)
        isPresnt = true;
    })
    if(isPresnt) {
      setIsError(true);
      setTimeout(()=>{
        setIsError(false);
      },2000)
    }else {
      setCart([...cart,{...item,total: item.price}])
    }
  }

  const handleCartClick = () => {
    setIsShowNav(!isShowNav);
  }

  

  const clearCart = () => {
    setCart([]);
  }

  const handleRemove = (itemId) => {
    const updatedCart = cart.filter((item)=>{
      return item.id !== itemId;
    })
    setCart(updatedCart);
  }


  const increaseQuantity = (itemId) => {
    
    const updatedCart = cart.map((item) => {
      function calculatePrice(quantity,normalPrice,discountPrice) {
        if(item.moq === null){
          discountPrice = normalPrice
        }

        if (quantity <= 0) {
          return 0; // Handle invalid input
        } else if (quantity < item.moq) {
          return normalPrice * quantity;
        } else {
          
          return discountPrice * quantity;
        }
      }
      
      if (item.id === itemId) {
        const updatedAmount = item.amount + 1;
        const updatedPrice = calculatePrice(updatedAmount,item.price, item.moqPrice)
        return { ...item, amount: updatedAmount,total: updatedPrice };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    
    const updatedCart = cart.map((item) => {
      function calculatePrice(quantity,normalPrice,discountPrice) {
        if(item.moq === null){
          discountPrice = normalPrice
        }
        if (quantity <= 0) {
          return 0; // Handle invalid input
        } else if (quantity < item.moq) {
          return normalPrice * quantity;
        } else {
          return discountPrice * quantity;
        }
      }
      
      if (item.id === itemId && item.amount > 1) {
        const updatedAmount = item.amount - 1;
        const updatedPrice = calculatePrice(updatedAmount,item.price, item.moqPrice)
        return { ...item, amount: updatedAmount,total: updatedPrice };
      }
      return item;
    });
    setCart(updatedCart);
  };



  return (
    <>
    <BrowserRouter>
      { isShowNav && <Cart handleRemove={handleRemove} handleCartClick={handleCartClick} cart={cart} clearCart={clearCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/> }
      <Nav handleCartClick={handleCartClick} cart={cart}/>
    <Routes >
    <Route path="/"  element={<LandingPage/>}/>
      <Route path="/products" element={<ProductPage isError={isError} handleCategoryQuery={handleCategoryQuery} category={category} handleQuery={handleQuery} query={query} handleCart={handleCart} categoryData={categoryData}/>}>
      </Route>
    </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
