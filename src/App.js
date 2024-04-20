// src/App.js
import React, { useState } from 'react';
import { getEarnings } from './requests';
import './app.css';

const App = () => {
  const [month, setMonth] = useState('');
  const [earningsData, setEarningsData] = useState([]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const fetchEarningsData = async () => {
    try {
      if (month <= 0) return;

      const response = await getEarnings(month);
      if (response && response.data) {
        const tableData = convertCsvToDataArray(response.data);
        setEarningsData(tableData);
      } else {
        setEarningsData([]);
      }
    } catch (error) {
      console.error(error);
      setEarningsData([]);
    }
  };

  const convertCsvToDataArray = (csvData) => {
    const rows = csvData.split('\r\n');
    return rows.map(row => row.split(','));
  };

  return (
    <div>
      <h1>Earnings Calendar</h1>
      <input 
        type="number" 
        placeholder="Enter month number" 
        value={month} 
        onChange={handleMonthChange}
      />
      <button onClick={fetchEarningsData}>Fetch Earnings</button>
      {earningsData.length > 0 && (
        <table className="earnings-table">
          <thead>
            <tr>
              {earningsData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {earningsData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
