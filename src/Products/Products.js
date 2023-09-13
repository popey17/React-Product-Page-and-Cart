import Card from "../components/Card";
import "./Products.css"

function Products({productData , category, handleCart}) {
  // console.log(productData);
  return (
    <div className="product-container-wrapper">
      <section className="card-container">
        {productData.filter((product)=>{
          const categoryCondition = category === '' ? product : product.category.name ===  category;
          const nameCondition = product.name.toLowerCase().includes(category.toLowerCase());
          return categoryCondition || nameCondition;

        }).map(product=>(
          <Card key={product.id}
          id={product.id}
          name= {product.name}
          img={product.image}
          description={product.description}
          category={product.category.name}
          price={product.price}
          handleCart={handleCart}
          amount = {product.amount}
          moq={product.moq_amount}
          moqPrice={product.moq_price}
          total= {product.total}
          />
        ))}
      </section>
    </div>
  )
}

export default Products