import React from 'react'
import { ShopList } from '../ListItems'
import "../styles/ShopList.css";

function ShoppingList() {
  return (
    <div className="shoppingList">
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
