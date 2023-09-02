import "./Nav.css"
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BiPackage} from "react-icons/bi";

function Nav() {
  return (
    <nav>
        <div className="logo">
          <a href="#">
            <span>My Shop</span>
          </a>
          
        </div>
          <div className="navlinks">
          <a href="#">
              <BiPackage className="nav-icons" />Products
            </a>
            <a href="#">
              <AiOutlineShoppingCart className="nav-icons"/>
              <span className="count">1</span>
            </a>
            
          </div>
      
    </nav>
  )
}

export default Nav