// ItemList.js
import React, { useState, useEffect } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [updateForm, setUpdateForm] = useState({ id: '', name: '', unitPrice: 0, unitQuantity: 0, itemCategory: '' });

  useEffect(() => {
    fetch('http://localhost:8080/items')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched items:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/items/${id}`, {
      method: 'DELETE',
    });

    // After deleting, update the item list
    const updatedItems = items.filter(item => item.ID !== id);
    setItems(updatedItems);
  };

  const handleUpdateClick = (item) => {
    // Show the update form with the current item details
    setUpdateForm({
      id: item.ID,
      name: item.Name,
      unitPrice: item.UnitPrice,
      unitQuantity: item.UnitQuantity,
      itemCategory: item.ItemCategory,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Send the updated data to the backend
    await fetch(`http://localhost:8080/items/${updateForm.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updateForm.name,
        unitPrice: updateForm.unitPrice,
        unitQuantity: updateForm.unitQuantity,
        itemCategory: updateForm.itemCategory,
      }),
    });

    // After updating, clear the update form and refresh the item list
    setUpdateForm({ id: '', name: '', unitPrice: 0, unitQuantity: 0, itemCategory: '' });
    const updatedItems = await fetch('http://localhost:8080/items').then(response => response.json());
    setItems(updatedItems);
  };

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item.ID}>
            {item.Name} - {item.UnitPrice} - {item.UnitQuantity} - {item.ItemCategory}
            <button onClick={() => handleDelete(item.ID)}>Delete</button>
            <button onClick={() => handleUpdateClick(item)}>Update</button>
            {updateForm.id === item.ID && (
              <form onSubmit={handleUpdateSubmit}>
                <label>Name:</label>
                <input
                  type="text"
                  value={updateForm.name}
                  onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
                />
                <label>Unit Price:</label>
                <input
                  type="number"
                  value={updateForm.unitPrice}
                  onChange={(e) => setUpdateForm({ ...updateForm, unitPrice: parseFloat(e.target.value) })}
                />
                <label>Unit Quantity:</label>
                <input
                  type="number"
                  value={updateForm.unitQuantity}
                  onChange={(e) => setUpdateForm({ ...updateForm, unitQuantity: parseInt(e.target.value) })}
                />
                <label>Item Category:</label>
                <input
                  type="text"
                  value={updateForm.itemCategory}
                  onChange={(e) => setUpdateForm({ ...updateForm, itemCategory: e.target.value })}
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

export default ItemList;
