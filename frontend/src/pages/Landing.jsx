import React from 'react';

import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <div className="landing-container">
      <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '3rem', boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)', marginBottom: '2rem' }}>M</div>
      <h1 className="landing-title">MoneyMap</h1>
      <p className="landing-subtitle">
        Take control of your finances with a sleek, intuitive expense tracker. Monitor your spending, analyze trends, and make smarter financial decisions instantly.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/signup" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Get Started</Link>
        <Link to="/login" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--card-border)' }}>Login</Link>
      </div>
    </div>
  );
};

export default Landing;
