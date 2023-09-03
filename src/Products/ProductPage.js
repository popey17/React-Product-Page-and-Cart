import Products from "./Products";
import Sidebar from '../Sidebar/Sidebar'

function ProductPage({handleQuery,productData,category}) {
  return (
    <>
      <Sidebar handleQuery={handleQuery}/> 
      <Products productData={productData} category={category}/>
    </>
  )
}

export default ProductPage