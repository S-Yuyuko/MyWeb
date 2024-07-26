import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserTie, FaUser } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { AppContext } from '../context/AppContext';
import AccountDialog from './AccountDialog';
import { getAdmins } from '../utils/indexedDB';
import './styles/Navbar.css';

const Navbar = () => {
  const { identity, resetIdentity } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminList, setAdminList] = useState([]);  // Initialize state for admin list

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAdminInfo = async () => {
    const admins = await getAdmins();
    if (admins.length > 0) {
      setAdminList(admins);  // Update admin list
    }
  };

  useEffect(() => {
    if (identity === 'admin') {
      fetchAdminInfo();
    }
  }, [identity]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    resetIdentity();
    navigate('/login');
  };

  const handleAccount = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!isLoginPage && (
          <>
            {isMobile ? (
              <div className="navbar-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
              </div>
            ) : (
              <ul className="navbar-menu">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/projects&professional">Projects & Professional</Link></li>
                <li><Link to="/aboutme">About Me</Link></li>
              </ul>
            )}
            {menuOpen && isMobile && (
              <ul className={`navbar-menu-mobile ${menuOpen ? 'open' : ''}`}>
                <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/projects&professional" onClick={toggleMenu}>Projects & Professional</Link></li>
                <li><Link to="/aboutme" onClick={toggleMenu}>About Me</Link></li>
              </ul>
            )}
          </>
        )}
        <div className="navbar-right">
          <ThemeToggle />
          {!isLoginPage && (
            <div className="identity-container" onClick={toggleDropdown}>
              {identity === 'admin' ? <FaUserTie className="identity-icon" /> : <FaUser className="identity-icon" />}
              <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                {identity === 'admin' ? <button onClick={handleAccount} className="dropdown-item">Account</button> : null}
                <button onClick={handleLogout} className="dropdown-item">Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AccountDialog open={dialogOpen} onClose={handleCloseDialog} adminInfo={adminList} refreshAdminInfo={fetchAdminInfo} />
    </nav>
  );
};

export default Navbar;
