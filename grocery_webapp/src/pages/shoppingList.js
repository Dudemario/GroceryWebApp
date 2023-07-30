import React, { useEffect, useState } from 'react'
import { ShopList } from '../ListItems'
import "../styles/ShopList.css";

function ShoppingList() {
  const [sortOption, setSortOption] = useState("alphabetical"); //sorting option
  const [sortList, setSortList] = useState(ShopList); //array of sorted items
  const [groupStore, setGroupStore] = useState(false); //group by store boolean
  const [removeText, setRemoveText] = useState("Remove From List"); //text below remove button
  const [remove, setRemove] = useState(false); //whether to remove or update text
  const [confirm, setConfirm] = useState(false); //whether to show remove confirmation
  const [removed, setRemoved] = useState([]); //array of removed items

  /* Sets sort to default (alphabeical) on page load. */
  useEffect(() => {
    setSortList([...ShopList].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  /* Re-sorts the list if an item is added back from removed. */
  useEffect(() => {
    if(groupStore) {
      sortGroup(sortOption);
    } else {
      sortReg(sortOption);
    }
  }, [removed]);

  /* Changes the sorting option currently selected if it's not called by the group checkbox
   *  then gets correct sorting method.
   */
  const handleSortChange = (event) => {
    let { value } = event.target;
    
    if(value === "groupByStore" || value === "undo") {
      value = sortOption;
    } else {
      setSortOption(value);
    }

    if(groupStore) {
      sortGroup(value);
    } else {
      sortReg(value);
    }
  };

  /* Sorts things. */
  const sortReg = (value) => {
    switch (value) {
      case 'alphabetical':
        setSortList([...sortList].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'priceLow':
        setSortList([...sortList].sort((a, b) => a.price - b.price));
        break;
      case 'priceHigh':
        setSortList([...sortList].sort((a, b) => b.price - a.price));
        break;
      case 'distLow':
        setSortList([...sortList].sort((a, b) => a.distance - b.distance));
        break;
      case 'distHigh':
        setSortList([...sortList].sort((a, b) => b.distance - a.distance));
        break;
      default:
        setSortList(sortList);
        break;
    }
  }

  /* Sorts things but with a twist (groups). */
  const sortGroup = (value) => {
    switch (value) {
      case 'alphabetical':
        setSortList(group([...sortList].sort((a, b) => a.name.localeCompare(b.name))));
        break;
      case 'priceLow':
        setSortList(group([...sortList].sort((a, b) => a.price - b.price)));
        break;
      case 'priceHigh':
        setSortList(group([...sortList].sort((a, b) => b.price - a.price)));
        break;
      case 'distLow':
        setSortList(group([...sortList].sort((a, b) => a.distance - b.distance)));
        break;
      case 'distHigh':
        setSortList(group([...sortList].sort((a, b) => b.distance - a.distance)));
        break;
      default:
        setSortList(group(sortList));
        break;
    }
  }

  /* Called when group checkbox is updated. Sets groupStore option to opposite. Then,
   *  if groupStore is false, sorts the list by group, otherwise defaulting back to
   *  how it was sorted before (this is required because the state of groupStore isn't)
   *  actually updated until after the function is completed).
   */
  const handleGroup = (event) => {
    setGroupStore(!groupStore);

    if(!groupStore) {
      setSortList(group(sortList));
    } else {
      sortReg(sortOption);
    }
  }

  /* Groups the items if they have same "store" and returns the new list. */
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

  /* Does stuff when remove button is clicked. */
  const handleRemove = (index) => {
    if(remove) {
      copyRemove(index); 
      removeItem(index);

      setRemove(false);
      setRemoveText("Remove From List")
      setConfirm(true);

      setTimeout(() => {
        setConfirm(false);
      }, 1500);
    } else {
      setRemoveText("Click To Confirm");
      setRemove(true);
      setConfirm(false);
    }
  }

  /* Removes an item at a specified index from the list. */
  const removeItem = (index) => {
    const updated = [...sortList];
    updated.splice(index, 1);
    setSortList(updated);
  }

  /* Copies the removed item to a separate array. */
  const copyRemove = (index) => {
    const toRemove = sortList[index];
    setRemoved([...removed, toRemove]);
  }

  /* Puts item from removed array back into main array. */
  const undoRemove = () => {
    if(removed.length !== 0) {
      setSortList((prevSortList) => [...prevSortList, removed[removed.length-1]]);

      const updated = [...removed];
      updated.splice(removed.length-1);
      setRemoved(updated);
    }
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
        <input type='checkbox' value="groupByStore" checked={groupStore} onChange={handleGroup}/> <p>group by store</p>
      </div>
      <div className='header'>
        <h1>Your Shopping List:</h1>
        {confirm ? <p className='confirm'>Item Removed Successfully</p> : <p></p>}
        <button className='undo' value="undo" onClick={undoRemove}>Undo Remove</button>
      </div>
      {sortList.map((item, index) => (
        <div key={index} className='item'>
          <img className='divideTop' src='https://i.ytimg.com/vi/XIMLoLxmTDw/hqdefault.jpg' alt='.'/>
          <img src={item.img} alt={item.name} className='itemImage'/>
          <div className='itemInfo'>
            <h3>{item.name}</h3>
            <p>Store: {item.store}, Price: ${item.price}, Distance: {item.distance}km away</p>
          </div>
          <div className='remove'>
            <button className='rButton' onClick={() => handleRemove(index)}><img className='removeX' src='https://cdn-icons-png.flaticon.com/512/109/109602.png' alt='remove from list'/></button>
            <p>{removeText}</p>
          </div>
          <img className='divideBot' src='https://i.ytimg.com/vi/XIMLoLxmTDw/hqdefault.jpg' alt='.'/>
        </div>
      ))}
      {/* If sortList is empty, display message, otherwise display total cost. */}
      {sortList.length === 0 ? <h2>Your Shopping List is Empty!</h2> : <h2>Total Cost: ${sortList.reduce((a, v) => a + v.price, 0).toFixed(2)}</h2>}
    </div>
  )
}

export default ShoppingList
