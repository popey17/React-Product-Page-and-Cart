import {FaBagShopping} from "react-icons/fa6";

function Card({category,img,name,description,price,handleCart,id,amount,moq,moqPrice,total}) {
  const item = {category,img,name,price,id,amount,moq,moqPrice,total}
  // console.log(moq);
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
              <p className="card-description">{description}</p>
            </section>
            <section className="card-footer">
              <div className="price">
                <div className="normalPrice">
                  Price: <span className="text-blue">{price}</span>
                </div>
                <div className="moqPrice text-blue">
                  {(moq > 0) ? <div>{moq}<span className="text-normal"> pieces price:</span>  {moqPrice}</div>:''}
                </div>
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