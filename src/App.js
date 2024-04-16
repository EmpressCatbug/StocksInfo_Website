// src/App.js
import React, { useState } from 'react';
import StockQueryForm from './components/StockQueryForm';
import StockDataTable from './components/StockDataTable';

const App = () => {
  const [stockData, setStockData] = useState([]);

  const fetchStockData = async (stockSymbol) => {
    try {
      //const response = requester.

      //setStockData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Stock Information</h1>
      <StockQueryForm onFetchStockData={fetchStockData} />
      <StockDataTable stockData={stockData} />
    </div>
  );
};

export default App;
