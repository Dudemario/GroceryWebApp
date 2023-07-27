import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { addToList } from '../components/List';
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
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [statusMsg, setStatusMsg] = useState("Retrieving Products...")

  const handleSortChange = (event) => {
    let { value } = event.target;  
    setSortOption(value);
    console.log(sortOption);
    
    switch (value) {
      case 'relevance':
        setSortedData(fileData);
        break;
      case 'priceLow':
        const sort = fileData.map((file) => ({
          name: file.name,
          data: [...file.data].sort((a, b) => {
            return parseFloat(a.price.replace('$','')) - parseFloat(b.price.replace('$',''));
          })
        }));
        setSortedData(sort);
        break;
    }

    console.log(fileData[0].data);
    console.log(sortedData[0].data);
  }

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
      setSortedData(parsedData);
    };

    fetchData();

    setTimeout(() => {
      setStatusMsg("There was an error fetching results");
    }, 5000)
  }, []);

  return (
    <div className='searchresult'>
      <h1>Showing Results For :</h1>
      <div className='options'>
        <p className='optionText'>Sort By:</p>
        <input type='radio' value="relevance" checked={sortOption === "relevance"} onChange={handleSortChange} /> <p className='optionText'>relevance</p> 
        <input type='radio' value="priceLow" checked={sortOption === "priceLow"} onChange={handleSortChange}/> <p className='optionText'>price (lowest)</p>
      </div>
      {sortedData.map((file, index) => (
        <div key={index}>
          <h3>{file.name}</h3>
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
        </div>
      ))}
      {fileData.length === 0 ? <h2>{statusMsg}</h2> : null}
    </div>
  );
};

export default SearchResult;