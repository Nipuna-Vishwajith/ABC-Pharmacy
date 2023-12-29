// DrugList.js
import React, { useState, useEffect } from 'react';

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/drugs')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched drugs:', data);
        setDrugs(data);
      })
      .catch(error => console.error('Error fetching drugs:', error));
  }, []);

  return (
    <div>
      <h2>Drug List</h2>
      <ul>
        {drugs.map(drug => (
          <li key={drug.ID}>
            {drug.Name} - {drug.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;
