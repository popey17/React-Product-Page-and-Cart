import Card from "../components/Card";
import "./Products.css"

function Products({productData , category}) {
  console.log(productData);
  return (
    <>
      <section className="card-container">
        {productData.filter((product)=>{
          const categoryCondition = category === '' ? product : product.category.name ===  category;
          const nameCondition = product.name.toLowerCase().includes(category.toLowerCase());
          return categoryCondition || nameCondition;

        }).map(product=>(
          <Card key={product.id}
          name= {product.name}
          img={product.image}
          description={product.description}
          category={product.category.name}
          price={product.price}
          />
        ))}
      </section>
    </>
  )
}

export default Products