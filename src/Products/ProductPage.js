import Products from "./Products";
import { useEffect } from "react";
import Sidebar from '../Sidebar/Sidebar'

function ProductPage({isError,handleQuery,productData,category,handleCart,categoryData}) {
  useEffect(()=>{
    console.log(isError);
  },[isError])
  
  return (
    <>
      <Sidebar handleQuery={handleQuery} categoryData={categoryData}/> 
      <Products productData={productData} category={category} handleCart={handleCart}/>
      { isError && <div className="warning">This item has already added to the cart.</div>}
    </>
  )
}

export default ProductPage