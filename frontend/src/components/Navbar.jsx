import React, { useContext } from 'react';

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>M</div>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '-0.5px' }}>MoneyMap</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
        <Link to="/expenses" className={`nav-link ${isActive('/expenses')}`}>Expenses</Link>
        <Link to="/add-expense" className={`nav-link ${isActive('/add-expense')}`}>Add Expense</Link>
        <button onClick={handleLogout} className="btn btn-danger btn-small" style={{ marginLeft: '1rem' }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
