import React, { useEffect, useState } from 'react';
import csvParser from 'csv-parser';

const CSVParser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('../website_search/products.csv'); 
      const parsedData = [];

      if (response.ok) {
        const text = await response.text();
        text.split('\n').forEach((line) => {
          const [title, price, image] = line.split(',');
          parsedData.push({ title, price, image });
        });
      }

      setData(parsedData);

    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.title} - {item.price} - {item.image}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CSVParser;