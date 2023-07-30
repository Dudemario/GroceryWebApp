import React from 'react';
import { Link } from "react-router-dom";
import BannerImage from "../assets/shoppingCart2.png";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer" >
        <h1> Optimal Shopper</h1>
        <p> Where Savings Meet Convenience</p>
        <Link to="/shoppingList"> 
          <button>
            Shopping List
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
