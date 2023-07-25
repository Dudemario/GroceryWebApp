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