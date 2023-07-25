import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import "../styles/Result.css";
import csvData from '../pages/website_searches/walmart.csv';

const SearchResult = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await Papa.parse(csvData, { header: true });
      // setData(response.data);
      // console.log(response.data);

      Papa.parse(csvData, {
        download: true,
        header: true,
        complete: function (products) {
          setData(products.data);
          console.log(products);
        },
      })
    };

    fetchData();
  }, []);

  return (
    <div className='searchresult'>
      <h1>Showing Results For: </h1>
      <div className='items'>
        {data.map((item, index) => (
          <div key={index}>
            <img src={item.img} alt={item.title} className='image' />
            <div className='info'>
              <div><b>{item.title}</b></div>
              <div>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;