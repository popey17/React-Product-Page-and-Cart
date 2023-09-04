import {FaBagShopping} from "react-icons/fa6";

function Card({category,img,name,description,price,handleCart}) {
  const item = {category,img,name,description,price}
  return (
    <section className="card">
          <div className="card-img-container">
            <img src={`https://items.aura.biocaremm.com/${img}`} alt="" className="card-image" />
          </div>
          <div className="card-detail">
            <div className="card-header">
              <h3 className="card-title">{name}</h3>
              <p className="card-category">{category}</p>
            </div>
            <section className="card-body">
              <p>{description}</p>
            </section>
            <section className="card-footer">
            <div className="price">
                {price}
              </div>
              <button className="bag" onClick={()=>handleCart(item)}>
                <FaBagShopping className="bag-icon" />
              </button>
            </section>

          </div>
        </section>
  )
}

export default Card