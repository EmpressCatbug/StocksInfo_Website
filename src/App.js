// src/App.js
import React, { useState } from 'react';
import { getEarnings } from './requests';
import './app.css'

const App = () => {
  const [month, setMonth] = useState('');
  const [earningsData, setEarningsData] = useState([]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const fetchEarningsData = async () => {
    try {
      
      if(month <=0) return;

      const response = await getEarnings(month); // Assuming getEarnings is an async function
      if (response && response.data) {
        setEarningsData(response.data);
      } else {
        setEarningsData([]);
      }
    } catch (error) {
      console.error(error);
      setEarningsData([]);
    }
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
      <div>
        {earningsData.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                {Object.keys(earningsData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {earningsData.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, subIndex) => (
                    <td key={subIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No earnings data available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
