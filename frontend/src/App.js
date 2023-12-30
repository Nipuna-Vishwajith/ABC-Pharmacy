// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import AppContent from './AppContent';
import InvoicePage from './InvoicePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppContent />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
};

export default App;
