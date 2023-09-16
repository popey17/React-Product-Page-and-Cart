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
  const [page , setPage] = useState(1);
  const [loading , setLoading] = useState(true);
  const [ending , setEnding] = useState(false);

  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';

  useEffect(()=>{
    fetchCategoryData()
   },[]);
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://items.aura.biocaremm.com/api/products?page=${page}&limit=12`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${Token}`,
          },
        });
        if (!response) {
          throw new Error('error fetching data');
        }
  
        const responseData = await response.json();
        const { data, next_page_url } = responseData;
        SetProductData(prev => [...prev, ...data]);
        setLoading(false);
        if (next_page_url === null) setEnding(true);
      } catch (error) {
        console.error(error);
        SetProductData([]);
      }
    };
  
    fetchData(); // Call the async function immediately
  
    if (!ending) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [ending,page]);
  

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!ending) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [ending]);


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
      <Route path="/products" element={<ProductPage productData={productData} handleQuery={handleQuery} category={category} handleCart={handleCart} categoryData={categoryData} isError={isError} loading={loading}/>}>
      </Route>
    </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
