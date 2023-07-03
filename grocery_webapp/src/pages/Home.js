import React from 'react';
import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer" >
        <h1> Vincent Sun</h1>
        <p> Cum</p>
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
