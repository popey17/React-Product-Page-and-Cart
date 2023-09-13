import "./LandingPage.css"
import { Link } from "react-router-dom"

function LandingPage() {
  return (
    <div className="landingPageContainer">
      <h1>Welcome to My Shop.</h1>
      <Link className="exploreBtn" to="/products" >Explore Our Items</Link>
    </div>
  )
}

export default LandingPage