import React, { useState } from 'react'
import { ShopList } from '../ListItems'
import "../styles/ShopList.css";

function ShoppingList() {
  const [sortOption, setSortOption] = useState("alphabetical");
  const [sortList, setSortList] = useState(ShopList);

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortOption(value);

    switch (value) {
      case 'alphabetical':
        setSortList([...ShopList].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'priceLow':
        setSortList([...ShopList].sort((a, b) => a.price - b.price));
        break;
      case 'priceHigh':
        setSortList([...ShopList].sort((a, b) => b.price - a.price));
        break;
      case 'distLow':
        setSortList([...ShopList].sort((a, b) => a.distance - b.distance));
        break;
      case 'distHigh':
        setSortList([...ShopList].sort((a, b) => b.distance - a.distance));
        break;
      default:
        setSortList(ShopList);
        break;
    }
  };

  return (
    <div className="shoppingList">
      <div className='options'>
        <p className='optionText'>Sorting:</p>
        <input type='radio' value="alphabetical" checked={sortOption === "alphabetical"} onChange={handleSortChange} /> <p className='optionText'>alphabetical</p> 
        <input type='radio' value="priceLow" checked={sortOption === "priceLow"} onChange={handleSortChange}/> <p className='optionText'>price (lowest)</p>
        <input type='radio' value="priceHigh" checked={sortOption === "priceHigh"} onChange={handleSortChange}/> <p className='optionText'>price (highest)</p>
        <input type='radio' value="distLow" checked={sortOption === "distLow"} onChange={handleSortChange}/> <p className='optionText'>distance (nearest)</p>
        <input type='radio' value="distHigh" checked={sortOption === "distHigh"} onChange={handleSortChange}/> <p className='optionText'>distance (furthest)</p>
        <input type='checkbox'/> <p>group by store</p>
      </div>
      <h1>Your Shopping List:</h1>
      {sortList.map((item, index) => (
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
