// src/components/StockQueryForm.js
import React, { useState } from 'react';

const StockQueryForm = ({ onFetchStockData }) => {
  const [stockSymbol, setStockSymbol] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFetchStockData(stockSymbol);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={stockSymbol}
        onChange={(event) => setStockSymbol(event.target.value)}
        placeholder="Enter stock symbol..."
      />
      <button type="submit">Fetch Stock Data</button>
    </form>
  );
};

export default StockQueryForm;