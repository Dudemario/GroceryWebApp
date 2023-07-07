import React, { useState } from 'react'
import { ShopList } from '../ListItems'
import "../styles/ShopList.css";

function ShoppingList() {
  const [sortOption, setSortOption] = useState("alphabetical");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="shoppingList">
      <div className='options'>
        <p>Sorting:</p>
        <input type='radio' value="alphabetical" checked={sortOption === "alphabetical"} onChange={handleSortChange} /> <p>alphabetical</p>
        <input type='radio' value="priceLow" checked={sortOption === "priceLow"} onChange={handleSortChange}/> <p>price (lowest)</p>
        <input type='radio' value="priceHigh" checked={sortOption === "priceHigh"} onChange={handleSortChange}/> <p>price (highest)</p>
        <input type='radio' value="distLow" checked={sortOption === "distLow"} onChange={handleSortChange}/> <p>distance (nearest)</p>
        <input type='radio' value="distHigh" checked={sortOption === "distHigh"} onChange={handleSortChange}/> <p>distance (furthest)</p>
        <input type='checkbox'/> <p>group by store</p>
      </div>
      <h1>Your Shopping List:</h1>
      {ShopList.map((item, index) => (
        <div key={index} className='item'>
          <img src={item.img} alt={item.name} className='itemImage'/>
          <div className='itemInfo'>
            <h3>{item.name}</h3>
            <p>Store: {item.store}, Price: ${item.price}, Distance: {item.distance}km away</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShoppingList
