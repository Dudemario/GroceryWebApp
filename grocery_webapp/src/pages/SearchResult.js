import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import "../styles/Result.css";

const fileContext = require.context('../pages/website_searches/', false, /\.csv$/);
const csvFiles = fileContext.keys().map(fileContext);

const getName = (filePath) => {
  let parts = filePath.split('/');
  parts = parts[3].split('.');
  const fileName = parts[0];
  return fileName;
};

const SearchResult = () => {
  const [fileData, setFileData] = useState([]);
  const [sortOption, setSortOption] = useState("alphabetical");

  const handleSortChange = (event) => {
    let { value } = event.target;
    
    setSortOption(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const parsedData = [];
      for (let i = 0; i < csvFiles.length; i++) {
        await new Promise((resolve, reject) => {
          Papa.parse(csvFiles[i], {
            download: true,
            header: true,
            complete: function (result) {
              parsedData.push({ name: getName(csvFiles[i]), data: result.data });
              resolve();
            },
            error: function (error) {
              reject(error);
            }
          });
        });
      }
      setFileData(parsedData);
    };

    fetchData();
  }, []);

  return (
    <div className='searchresult'>
      <h1>Showing Results For:</h1>
      <div className='options'>
        <p className='optionText'>Sorting:</p>
        <input type='radio' value="alphabetical" checked={sortOption === "alphabetical"} onChange={handleSortChange} /> <p className='optionText'>recommended</p> 
        <input type='radio' value="priceLow" checked={sortOption === "priceLow"} onChange={handleSortChange}/> <p className='optionText'>price (lowest)</p>
        <input type='radio' value="priceHigh" checked={sortOption === "priceHigh"} onChange={handleSortChange}/> <p className='optionText'>price (highest)</p>
        <input type='radio' value="distLow" checked={sortOption === "distLow"} onChange={handleSortChange}/> <p className='optionText'>distance (nearest)</p>
        <input type='radio' value="distHigh" checked={sortOption === "distHigh"} onChange={handleSortChange}/> <p className='optionText'>distance (furthest)</p>
        <input type='checkbox' value='withinDistance'/> <p>only show stores within certain radius</p>
      </div>
      {fileData.map((file, index) => (
        <div key={index}>
          <h3>{file.name}</h3>
          <div className='items'>
            {file.data.map((item, idx) => (
              <div key={idx}>
                <img src={item.img} alt={item.title} className='image' />
                <div className='info'>
                  <div><b>{item.title}</b></div>
                  <div>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;