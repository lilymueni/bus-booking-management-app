import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ensure this path is correct
//import { doCreateUserWithEmailAndPassword } from '../../../firebase/Auth';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        // Register with Firebase
        //await doCreateUserWithEmailAndPassword(email, password);
        
        // Register user with backend
        await axios.post('https://bus-booking-management-system1.onrender.com/signup', {
          email,
          username,
          password
        });

        navigate('/home');
      } catch (err) {
        setErrorMessage('Failed to create account');
        setIsRegistering(false);
      }
    }
  };

  // if (userLoggedIn) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-header">Welcome to TransitWise</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
              autoComplete="username"
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              autoComplete="new-password"
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
              autoComplete="off"
            />
          </div>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <button
            type="submit"
            disabled={isRegistering}
            className={`auth-button ${isRegistering ? 'disabled' : ''}`}
          >
            {isRegistering ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="switch-auth-link">
            Already have an account?{' '}
            <Link to="/login" className="switch-auth-link-text">
              Continue
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
