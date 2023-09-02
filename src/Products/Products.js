import "./Products.css"
import {FaBagShopping} from "react-icons/fa6";

function Products() {
  return (
    <>
      <section className="card-container">
        <section className="card">
          <div className="card-img-container">
            <img src="https://items.aura.biocaremm.com/uploads/1.jpg" alt="" className="card-image" />
          </div>
          <div className="card-detail">
            <div className="card-header">
              <h3 className="card-title">Strawberry Smoothie</h3>
              <p className="card-category">drinks</p>
            </div>
            <section className="card-body">
              <p>drink with strawberry and lime and water</p>
            </section>
            <section className="card-footer">
            <div className="price">
                1000
              </div>
              <div className="bag">
                <FaBagShopping className="bag-icon" />
              </div>
            </section>

          </div>
        </section>
      </section>
    </>
  )
}

export default Products