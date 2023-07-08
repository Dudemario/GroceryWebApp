import React, { useState } from 'react';
import "../styles/SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({placeholder, data}) {

/* creates variable called filteredData with a function setFilteredData*/
    const [filteredData, setFilteredData] = useState ([]);
    const [wordEntered, setWordEntered] = useState ("");

/* filtering data results to show based on typed searchWord*/
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      })

/* to not display the options below the search bar if there is nothing there*/
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      } 
    }

/* function to get CloseIcon to clear the text in the search bar*/
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value = {wordEntered} onChange= {handleFilter}/>
        <div className="searchIcon"> 
            {filteredData.length === 0 ? ( 
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick = {clearInput} /> 
            )} 
          
        </div>
      </div> 
      {filteredData.length != 0 && ( 
      <div className="dataResult">
        {filteredData.slice(0, 15).map((value, key) => {
          return  (
            <a className="dataItem" href={value.link} target="_blank"> 
            {" "}
            {value.title} </a>
        );
        })}
      </div>
      )}
    </div>
  )
}

export default SearchBar
