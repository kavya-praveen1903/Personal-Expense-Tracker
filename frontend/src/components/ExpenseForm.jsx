import React, { useState, useEffect } from 'react';
import api from '../api';

const ExpenseForm = ({ onSuccess, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    'Food', 'Housing', 'Transportation', 'Utilities', 
    'Insurance', 'Healthcare', 'Saving & Debts', 'Personal Spending', 'Entertainment', 'Other'
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount,
        category: initialData.category,
        date: new Date(initialData.date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await api.put(`/expenses/${initialData._id}`, formData);
      } else {
        await api.post('/expenses', formData);
      }
      onSuccess();
      if (!initialData) {
        setFormData({
          title: '',
          amount: '',
          category: 'Food',
          date: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error saving expense', error);
      alert('Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          className="input-field" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          placeholder="e.g. Groceries"
        />
      </div>
      <div className="input-group">
        <label>Amount (₹)</label>
        <input 
          type="number" 
          name="amount" 
          className="input-field" 
          value={formData.amount} 
          onChange={handleChange} 
          required 
          min="0.01" 
          step="0.01"
          placeholder="0.00"
        />
      </div>
      <div className="input-group">
        <label>Category</label>
        <select 
          name="category" 
          className="input-field" 
          value={formData.category} 
          onChange={handleChange}
        >
          {categories.map(cat => (
            <option key={cat} value={cat} style={{ color: '#000' }}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>Date</label>
        <input 
          type="date" 
          name="date" 
          className="input-field" 
          value={formData.date} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" className="btn" disabled={loading} style={{ flex: 1 }}>
          {loading ? 'Saving...' : (initialData ? 'Update Expense' : 'Add Expense')}
        </button>
        {initialData && (
          <button type="button" className="btn btn-danger" onClick={onCancel} style={{ flex: 1 }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
