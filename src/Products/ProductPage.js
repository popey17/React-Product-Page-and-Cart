import Products from "./Products";
import Sidebar from '../Sidebar/Sidebar'

function ProductPage({handleQuery,category,handleCategoryQuery,query,handleCart,categoryData,isError}) {
  
  return (
    <>
      <Sidebar handleQuery={handleQuery} categoryData={categoryData} handleCategoryQuery={handleCategoryQuery}/> 
      <Products  query={query} handleCart={handleCart} category={category}/>
      { isError && <div className="warning">This item has already added to the cart.</div>}
    </>
  )
}

export default ProductPage