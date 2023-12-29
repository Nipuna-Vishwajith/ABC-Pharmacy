// DrugList.js
import React, { useState, useEffect } from 'react';

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:8080/drugs')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched drugs:', data);
        setDrugs(data);
      })
      .catch(error => console.error('Error fetching drugs:', error));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/drugs/${id}`, {
      method: 'DELETE',
    });

    // After deleting, update the drug list
    const updatedDrugs = drugs.filter(drug => drug.ID !== id);
    setDrugs(updatedDrugs);
  };

  const handleUpdateClick = (drug) => {
    // Show the update form with the current drug details
    setUpdateForm({
      id: drug.ID,
      name: drug.Name,
      description: drug.Description,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Send the updated data to the backend
    await fetch(`http://localhost:8080/drugs/${updateForm.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updateForm.name,
        description: updateForm.description,
      }),
    });

    // After updating, clear the update form and refresh the drug list
    setUpdateForm({ id: '', name: '', description: '' });
    const updatedDrugs = await fetch('http://localhost:8080/drugs').then(response => response.json());
    setDrugs(updatedDrugs);
  };

  return (
    <div>
      <h2>Drug List</h2>
      <ul>
        {drugs.map(drug => (
          <li key={drug.ID}>
            {drug.Name} - {drug.Description}
            <button onClick={() => handleDelete(drug.ID)}>Delete</button>
            <button onClick={() => handleUpdateClick(drug)}>Update</button>
            {updateForm.id === drug.ID && (
              <form onSubmit={handleUpdateSubmit}>
                <label>Name:</label>
                <input
                  type="text"
                  value={updateForm.name}
                  onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
                />
                <label>Description:</label>
                <input
                  type="text"
                  value={updateForm.description}
                  onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                />
                <button type="submit">Save</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;
