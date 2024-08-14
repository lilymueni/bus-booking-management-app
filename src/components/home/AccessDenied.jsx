import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccessDenied.css';

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="access-denied-container">
      <h1>404 Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button className="redirect-button" onClick={handleRedirect}>
        Go to Home
      </button>
    </div>
  );
};

export default AccessDenied;
