import React from 'react'
import { ShopList } from '../components/List'
import '../styles/ShopList.css'

function Menu() {
  return (
    <div className="shoppingList">
      {ShopList.map((item, index) => (
        <div key={index} className='item'>
          <img className='divideTop' src='https://i.ytimg.com/vi/XIMLoLxmTDw/hqdefault.jpg' alt='.'/>
          <img src={item.img} alt={item.name} className='itemImage'/>
          <div className='itemInfo'>
            <h3>{item.name}</h3>
            <p>Store: {item.store}, Price: {item.price}, Distance: {item.distance}km away</p>
          </div>
          <img className='divideBot' src='https://i.ytimg.com/vi/XIMLoLxmTDw/hqdefault.jpg' alt='.'/>
        </div>
      ))}
    </div>
  )
}

export default Menu