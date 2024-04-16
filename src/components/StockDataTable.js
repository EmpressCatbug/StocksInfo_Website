// src/components/StockDataTable.js
import React from 'react';

const StockDataTable = ({ stockData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {stockData.map((dataPoint) => (
          <tr key={dataPoint.date}>
            <td>{dataPoint.date}</td>
            <td>{dataPoint.open}</td>
            <td>{dataPoint.high}</td>
            <td>{dataPoint.low}</td>
            <td>{dataPoint.close}</td>
            <td>{dataPoint.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockDataTable;