import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Signup from "./components/signup/Signup";
import Signin from "./components/signup/Signin";
import Todo from "./components/todo/Todo";
import { useEffect } from "react";
import { authActions } from "./store";
import { useDispatch } from "react-redux";
import axios from "axios";

const App = () =>{
  const dispatch = useDispatch();
useEffect(() => {
 const id = sessionStorage.getItem("id");
  if(id){
    axios.get(`http://localhost:8080/api/v1/getUser/${id}`)
      .then((res) => {
        dispatch(authActions.login(res.data.user));
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        sessionStorage.removeItem("id");
      });
  }
},[]);


  return(
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route  exact path="/" element={<Home/>}/>
          <Route  path ="/about" element={<About/>}/>
          <Route  path ="/todo" element={<Todo/>}/>
          <Route  path ="/signup" element={<Signup/>}/>
          <Route  path ="/signin" element={<Signin/>}/>
        </Routes>
      </Router>
      
      
      <Footer/>
    </div>
  )
}

export default App;