import Products from "./Products";
import Sidebar from '../Sidebar/Sidebar'

function ProductPage({handleQuery,productData,category,handleCart}) {
  return (
    <>
      <Sidebar handleQuery={handleQuery}/> 
      <Products productData={productData} category={category} handleCart={handleCart}/>
    </>
  )
}

export default ProductPage