import React, { useState } from 'react';
import logo from "../assets/transparentLogo.png";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";
import SearchBar from "./SearchBar.js";
import FoodData from "../Data.json"

function Navbar ({currentPage}) {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  }

  return (
    <div className="navbar">

    <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={logo} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/shoppingList"> Shopping List </Link>
          <Link to="/about"> About </Link>
        </div>
      </div>
      {currentPage === '/' && (
      <div className="searchbar">
         <SearchBar placeholder="Search Products" data={FoodData}/>
      </div>
      )}
      <div className="rightSide"> 
        <Link to="/"> Home </Link>
        <Link to="/shoppingList"> Shopping List </Link>
        <Link to="/about"> About </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon/>   
        </button>
      </div>

    </div>
  )
}

export default Navbar
