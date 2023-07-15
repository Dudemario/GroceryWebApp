import React, { useEffect, useState } from 'react'
import { ShopList } from '../ListItems'
import "../styles/ShopList.css";

function ShoppingList() {
  const [sortOption, setSortOption] = useState("alphabetical");
  const [sortList, setSortList] = useState(ShopList);
  const [groupStore, setGroupStore] = useState(false);
  // const [originalState, setOriginalState] = useState(ShopList);

  useEffect(() => {
    setSortList([...ShopList].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const handleGroup = (event) => {
    setGroupStore(!groupStore);

    setSortList(group(sortList));

    // const { value } = event.target;

    // if(value === 'groupByStore') {
    //   setGroupStore(!groupStore);
    // }

    // if(groupStore) {
    //   setSortList(group(sortList));
    //   return;
    // } else {
    //   setSortList(sortList);
    // }
  }

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

    // if(groupStore) {
    //   setSortList(group(sortList));
    //   return;
    // } else {
    //   setSortList(originalState);
    // }
  };

  const group = (list) => {
    const itemGroup = {};
    const result = [];

    list.forEach((item) => {
      const store = item.store;
      if(!itemGroup[store]) {
        itemGroup[store] = [];
      }
      itemGroup[store].push(item)
    });

    for(const store in itemGroup) {
      result.push(...itemGroup[store]);
    }

    return result;
  }

  const removeItem = (index) => {
    const updated = [...sortList];
    updated.splice(index, 1);
    setSortList(updated);
    console.log(sortList.length);
  }

  return (
    <div className="shoppingList">
      <div className='options'>
        <p className='optionText'>Sorting:</p>
        <input type='radio' value="alphabetical" checked={sortOption === "alphabetical"} onChange={handleSortChange} /> <p className='optionText'>alphabetical</p> 
        <input type='radio' value="priceLow" checked={sortOption === "priceLow"} onChange={handleSortChange}/> <p className='optionText'>price (lowest)</p>
        <input type='radio' value="priceHigh" checked={sortOption === "priceHigh"} onChange={handleSortChange}/> <p className='optionText'>price (highest)</p>
        <input type='radio' value="distLow" checked={sortOption === "distLow"} onChange={handleSortChange}/> <p className='optionText'>distance (nearest)</p>
        <input type='radio' value="distHigh" checked={sortOption === "distHigh"} onChange={handleSortChange}/> <p className='optionText'>distance (furthest)</p>
        {/* <input type='checkbox' value="groupByStore" checked={groupStore} onChange={handleGroup}/> <p>group by store</p> */}
        <button onClick={handleGroup}>group by store</button>
      </div>
      <h1>Your Shopping List:</h1>
      {sortList.map((item, index) => (
        <div key={index} className='item'>
          <img src={item.img} alt={item.name} className='itemImage'/>
          <div className='itemInfo'>
            <h3>{item.name}</h3>
            <p>Store: {item.store}, Price: ${item.price}, Distance: {item.distance}km away</p>
          </div>
          <div className='remove'>
            <button onClick={() => removeItem(index)}>remove</button>
          </div>
        </div>
      ))}
      {sortList.length === 0 ? <h2>Your Shopping List is Empty!</h2> : <h2>Total: xx</h2>}
    </div>
  )
}

export default ShoppingList
