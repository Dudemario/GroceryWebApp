import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { addToList } from '../components/List';
import "../styles/Result.css";

const fileContext = require.context('../pages/website_searches/', false, /\.csv$/); //csv files path
const csvFiles = fileContext.keys().map(fileContext);

/* Parses the name of the store from the csv file title. */
const getName = (filePath) => {
  let parts = filePath.split('/');
  parts = parts[3].split('.');
  parts = parts[0].split('~');
  return parts[0];
};

/* Parses the distance to the store from the csv file title. */
const getDist = (filePath) => {
  let parts = filePath.split('/');
  parts = parts[3].split('.');
  parts = parts[0].split('~');
  return parts[1];
}

const SearchResult = () => {
  const [fileData, setFileData] = useState([]); //default file data
  const [sortedData, setSortedData] = useState([]); //sorted file data
  const [sortOption, setSortOption] = useState("relevance"); //sorting option
  const [statusMsg, setStatusMsg] = useState("Retrieving Products...") //placeholder message at bottom

  /* Toggles the sorting between the default sorting and sorting by price. */
  const handleSortChange = (event) => {
    let { value } = event.target;  
    setSortOption(value);
    console.log(sortOption);
    
    if(value.valueOf() === "relevance") {
      setSortedData(fileData);
    } else {
      const sort = fileData.map((file) => ({
        name: file.name,
        distance: file.distance,
        show: true,
        data: [...file.data].sort((a, b) => {
          return parseFloat(a.price.replace('$','')) - parseFloat(b.price.replace('$',''));
        })
      }));
      setSortedData(sort);
    }
  }

  /* Parses information from the csv files. */
  useEffect(() => {
    const fetchData = async () => {
      const parsedData = [];
      for (let i = 0; i < csvFiles.length; i++) {
        await new Promise((resolve, reject) => {
          Papa.parse(csvFiles[i], {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
              parsedData.push({ name: getName(csvFiles[i]), distance: getDist(csvFiles[i]), data: result.data, show: true });
              resolve();
            },
            error: function (error) {
              reject(error);
            }
          });
        });
      }
      setFileData([...parsedData].sort((a,b) => a.distance - b.distance)); //sorts by distance
      setSortedData([...parsedData].sort((a,b) => a.distance - b.distance));
    };

    fetchData();

    setTimeout(() => {
      setStatusMsg("There was an error fetching results");
    }, 5000)
  }, []);

  const handleCollapse = (index) => {
    setSortedData((prevSorted) => {
      const update = [...prevSorted];
      update[index] = { ...prevSorted[index], show: !prevSorted[index].show };
      return update;
    });
  }

  return (
    <div className='searchresult'>
      <h1>Showing Results For {/*item name goes here*/}:</h1>
      <div className='options'>
        <p className='optionText'>Sort By:</p>
        <input type='radio' value="relevance" checked={sortOption === "relevance"} onChange={handleSortChange} /> <p className='optionText'>relevance</p> 
        <input type='radio' value="priceLow" checked={sortOption === "priceLow"} onChange={handleSortChange}/> <p className='optionText'>price (lowest)</p>
      </div>
      {sortedData.map((file, index) => (
        <div key={index}>
          <h3>{file.name}, {file.distance}km away <button onClick={() => handleCollapse(index)}>{file.show ? "collapse" : "show"}</button></h3>
          {file.show ? (
          <div className='items'>
            {file.data.map((item, idx) => (
              <div key={idx}>
                <a href={`//${item.url}`}><img src={item.img} alt={item.title} className='image' /></a>
                <div className='info'>
                  <div><b>{item.title}</b></div>
                  <div>{item.price}</div>
                  <button className='addButton' onClick={() => addToList(item.title, item.price, file.name, 1, item.img)}>Add to List</button>
                </div>
              </div>
            ))}
          </div>
          ) : null}
        </div>
      ))}
      {fileData.length === 0 ? <h2>{statusMsg}</h2> : null}
    </div>
  );
};

export default SearchResult;