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

  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';
  useEffect(()=>{
    fetchProductData()
    fetchCategoryData()
   },[]);

   async function fetchProductData() {
    try{
      const response = await fetch ('http://items.aura.biocaremm.com/api/products', {
        method: 'GET',
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
      const response = await fetch ('http://items.aura.biocaremm.com/api/categories', {
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
    console.log(item)
  }

  const handleCartClick = () => {
    setIsShowNav(!isShowNav);
  }

  return (
    <>
    <BrowserRouter>
      { isShowNav && <Cart  handleCartClick={handleCartClick}/> }
      <Nav handleCartClick={handleCartClick}/>
    <Routes >
    <Route path="/"  element={<LandingPage/>}/>
      <Route path="/products" element={<ProductPage productData={productData} handleQuery={handleQuery} category={category} handleCart={handleCart} categoryData={categoryData}/>}>
      </Route>
    </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
