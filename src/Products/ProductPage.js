import Products from "./Products";
import Sidebar from '../Sidebar/Sidebar'

function ProductPage({handleQuery,category,handleCategoryQuery,query,handleCart,categoryData}) {
  
  return (
    <>
      <Sidebar handleQuery={handleQuery} categoryData={categoryData} handleCategoryQuery={handleCategoryQuery}/> 
      <Products  query={query} handleCart={handleCart} category={category}/>
    </>
  )
}

export default ProductPage