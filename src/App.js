import Nav from "./Nav/Nav";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
import { useState, useEffect } from "react";

function App() {
  const [productData, SetProductData] = useState([]);
  const [category,setCategory] = useState('');

  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';
  useEffect(()=>{
    fetchData()
   },[])

   useEffect(()=> {
    console.log(category);
  },[category])

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
      console.log(responseData);
      SetProductData (responseData);

    }catch (error) {
      console.error(error);
      SetProductData ([]);
    }
  }

  const handleClick = (e) => {
    setCategory(e.target.value)
  }

  

  return (
    <>
      <Nav />
      <Sidebar handleClick={handleClick}/> 
      <Products productData={productData}/>
    </>
  );
}

export default App;
