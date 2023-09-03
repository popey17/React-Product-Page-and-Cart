import Card from "../components/Card";
import "./Products.css"

function Products({productData}) {
  return (
    <>
      <section className="card-container">
        {productData.map(product=>(
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