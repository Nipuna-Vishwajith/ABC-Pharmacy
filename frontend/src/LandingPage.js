// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h2>Welcome to ABC Pharmacy</h2>
      <p>This is the landing page content.</p>
      <Link to="/app">
        <button>Go to App</button>
      </Link>
      <Link to="/invoice">
        <button>Go to Invoice</button>
      </Link>
    </div>
  );
};

export default LandingPage;
