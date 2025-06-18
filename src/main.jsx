import React from 'react';
import ReactDOM from 'react-dom/client';
import ShiftTracker from './App.jsx'; // Using your ShiftTracker as the main component
import './index.css'; // Tailwind styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShiftTracker />
  </React.StrictMode>
);
