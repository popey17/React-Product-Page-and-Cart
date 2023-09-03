import "./Nav.css"
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BiPackage} from "react-icons/bi";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
        <div className="logo">
          <Link to='/'>My Shop</Link>
        </div>
          <div className="navlinks">
            <Link to='/products'><BiPackage className="nav-icons" />Products</Link>
            <a href="#">
              <AiOutlineShoppingCart className="nav-icons"/>
              <span className="count">1</span>
            </a>
            
          </div>
      
    </nav>
  )
}

export default Nav