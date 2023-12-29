import React, { useState } from 'react';

const DrugForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await fetch('http://localhost:8080/drugs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    setName('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add Drug</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <button type="submit">Add Drug</button>
      </form>
    </div>
  );
};

export default DrugForm;
