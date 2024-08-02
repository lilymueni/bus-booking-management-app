import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom'; // Add Navigate here
import { useAuth } from '../../contexts/AuthContext'; // Ensure this path is correct
import { doSignInWithEmailAndPassword } from '../../../firebase/Auth';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggingIn) {
      setIsLoggingIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (err) {
        setErrorMessage('Failed to log in');
        setIsLoggingIn(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-header">Login to TransitWise</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              autoComplete="current-password"
            />
          </div>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`auth-button ${isLoggingIn ? 'disabled' : ''}`}
          >
            {isLoggingIn ? 'Logging In...' : 'Log In'}
          </button>
          <div className="switch-auth-link">
            Don't have an account?{' '}
            <Link to="/signup" className="switch-auth-link-text">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
