import React from 'react';
import DrugList from './components/DrugList';
import DrugForm from './components/DrugForm';

function App() {
  return (
    <div>
      <h1>ABC Pharmacy</h1>
      <DrugList />
      <DrugForm />
    </div>
  );
}

export default App;
