// AppContent.js
import React from 'react';
import DrugList from './components/DrugList';
import DrugForm from './components/DrugForm';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const AppContent = () => {
  return (
    <div>
      <h1>ABC Pharmacy</h1>
      <DrugList />
      <DrugForm />
      <ItemList />
      <ItemForm />
      </div>
  );
};

export default AppContent;
