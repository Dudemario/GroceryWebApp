// import React from 'react'

// function Menu() {
//   return (
//     <div className="shoppingList">
      
//     </div>
//   )
// }

// export default Menu

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import "../styles/Result.css";
import data1 from '../pages/website_searches/walmart.csv';
import data2 from '../pages/website_searches/no-frills.csv';
import data3 from '../pages/website_searches/sobeys.csv';

const getCSVName = (filePath) => {
  let parts = filePath.split('/');
  parts = parts[3].split('.');
  const fileName = parts[0];
  return fileName;
};

const SearchResult = () => {
  const files = [
    { name: getCSVName(data1), data: data1 },
    { name: getCSVName(data2), data: data2 },
    { name: getCSVName(data3), data: data3 }
  ];
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const parsedData = [];
      for (let i = 0; i < files.length; i++) {
        await new Promise((resolve, reject) => {
          Papa.parse(files[i].data, {
            download: true,
            header: true,
            complete: function (result) {
              parsedData.push({ name: files[i].name, data: result.data });
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
      {fileData.map((file, index) => (
        <div key={index} >
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