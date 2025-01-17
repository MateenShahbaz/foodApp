import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Model from "../../src/Model"
import Cart from "../screens/Cart"
import { useCart } from "../components/ContextReducer"
const NavBar = () => {
  let data = useCart();
  const [view, setView] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            YourFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myorder"
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=> setView(true)}>
                  My Cart {" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                {
                  view? <Model onClose={()=> setView(false)}><Cart /></Model> : ""
                }
                <div className="btn bg-white text-success mx-2" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
