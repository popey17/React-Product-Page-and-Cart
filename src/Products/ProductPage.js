import Products from "./Products";
import Sidebar from '../Sidebar/Sidebar'

function ProductPage({handleQuery,productData,category,handleCart,categoryData}) {
  return (
    <>
      <Sidebar handleQuery={handleQuery} categoryData={categoryData}/> 
      <Products productData={productData} category={category} handleCart={handleCart}/>
    </>
  )
}

export default ProductPage