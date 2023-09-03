import Nav from "./Nav/Nav";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductPage from "./Products/ProductPage";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  const [productData, SetProductData] = useState([]);
  const [category,setCategory] = useState('');

  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';
  useEffect(()=>{
    fetchData()
   },[]);

  //  useEffect(()=>{
  //   console.log(category);
  //  },[category])

   async function fetchData() {
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

  const handleQuery = (e) => {
    setCategory(e.target.value)
  }


  return (
    <>
    <BrowserRouter>
      <Nav />
    <Routes >
    <Route path="/"  element={<LandingPage/>}/>
      <Route path="/products" element={<ProductPage productData={productData} handleQuery={handleQuery} category={category}/>}>
      </Route>
    </Routes>
      
    </BrowserRouter>
    </>
  );
}

export default App;
