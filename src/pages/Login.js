import React, { useContext, useState } from 'react';
import { FaUserTie, FaUser, FaArrowLeft, FaUserAlt, FaLock } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import './styles/Login.css';

const Login = () => {
  const { handleLogin, showInputs, handleIdentityChange, identity, resetIdentity, error } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    handleLogin(identity, username, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {showInputs && (
          <FaArrowLeft className="back-icon" onClick={resetIdentity} />
        )}
        <h2 className="login-title">Welcome</h2>
        <p className="login-subtitle">
          {!showInputs ? 'Choose Your Identity' : 'Please Enter Your Credentials'}
        </p>
        {error && <p className="error-message">{error}</p>}
        <div className="content-container">
          <div className={`login-content ${showInputs ? 'hide' : 'show'}`}>
            <div className="login-options">
              <button
                className={`login-button ${identity === 'tour' ? 'selected' : ''}`}
                onClick={() => handleIdentityChange('tour')}
              >
                <FaUser className="login-icon" />
                Tour
              </button>
              <button
                className={`login-button ${identity === 'admin' ? 'selected' : ''}`}
                onClick={() => handleIdentityChange('admin')}
              >
                <FaUserTie className="login-icon" />
                Admin
              </button>
            </div>
          </div>
          <div className={`login-content ${showInputs ? 'show' : 'hide'}`}>
            <div className="input-wrapper">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="login-submit" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
