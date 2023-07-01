import React from 'react'
import vincentFace from "../assets/vincentFace.PNG";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={vincentFace} />
      </div>
      <div className="rightSide"> 
        <Link to="/"> Home </Link>
        <Link to="/shoppingList"> Shopping List </Link>
        <Link to="/help"> Help </Link>
        <Link to="/contact"> Contact Us </Link>
      </div>
    </div>
  )
}

export default Navbar
