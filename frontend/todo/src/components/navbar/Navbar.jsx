import React from "react";
import "./Navbar.css";
import { SiBookstack } from "react-icons/si";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";


const Navbar = () => {
  const isLoggedin = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    // Redirect to home or signin after logout
    window.location.href = "/";
  }
  console.log(isLoggedin);
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <Link className="navbar-brand" to="#"><b><SiBookstack />&nbsp;todo</b></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2 my-2 ">
                <Link className="nav-Link active text-decoration-none text-black  p-lg-0 p-2 " aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item mx-2 my-2 ">
                <Link className="nav-Link active text-decoration-none text-black   p-lg-0 p-2" aria-current="page" to="/about">About Us</Link>
              </li>
              <li className="nav-item mx-2 my-2">
                <Link className="nav-Link active text-decoration-none text-black p-lg-0 p-2" aria-current="page" to="/todo">Todo</Link>
              </li>
              {!isLoggedin && (
                <>
                  <div className="d-flex my-sm-2 my-2 my-lg-0">
                    <li className="nav-item mx-2 my-2">
                      <Link className="nav-Link active btn-nav  p-2" to="/signup">SignUp</Link>
                    </li>

                  </div>
                  <div className="d-flex ">
                    <li className="nav-item mx-2 my-2 ">
                      <Link className="nav-Link active btn-nav  p-2" to="/signin">SignIn</Link>
                    </li>
                  </div>

                </>
              )}

              {isLoggedin && (
                <li className="nav-item mx-2" onClick={logout}>
                  <Link className="nav-Link active btn-nav" to="/logout">Log Out</Link>

                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;