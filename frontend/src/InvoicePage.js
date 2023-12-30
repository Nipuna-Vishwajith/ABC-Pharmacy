import React, { useState, useEffect } from 'react';

const InvoicePage = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch items from the server
    fetch('http://localhost:8080/items')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched items:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  useEffect(() => {
    // Calculate total whenever invoiceItems or items change
    let calculatedTotal = 0;
    invoiceItems.forEach(invoiceItem => {
      const item = items.find(item => item.Name === invoiceItem.name);
      calculatedTotal += item.UnitPrice * invoiceItem.quantity;
    });
    setTotal(calculatedTotal);
  }, [invoiceItems, items]);

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      setInvoiceItems([...invoiceItems, { name: selectedItem, quantity }]);
      setSelectedItem('');
      setQuantity(1);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedInvoiceItems = [...invoiceItems];
    updatedInvoiceItems.splice(index, 1);
    setInvoiceItems(updatedInvoiceItems);
  };

  return (
    <div>
      <h2>Invoice Page</h2>

      <div>
        <label>Select Item:</label>
        <input
          type="text"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          list="itemList"
        />
        <datalist id="itemList">
          {items.map(item => (
            <option key={item.ItemID} value={item.Name} />
          ))}
        </datalist>

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />

        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div>
        <h3>Selected Items:</h3>
        <ul>
          {invoiceItems.map((invoiceItem, index) => (
            <li key={index}>
              {invoiceItem.name} - Quantity: {invoiceItem.quantity}
              <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default InvoicePage;
