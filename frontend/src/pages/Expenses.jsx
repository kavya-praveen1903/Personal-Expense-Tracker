import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../api';
import ExpenseList from '../components/ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('All Time');

  const fetchData = async () => {
    try {
      setLoading(true);
      const expensesRes = await api.get('/expenses');
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        await fetchData();
      } catch (error) {
        console.error('Failed to delete expense', error);
      }
    }
  };

  const handleEdit = (expense) => {
    navigate('/add-expense', { state: { expense } });
  };

  const filteredExpenses = useMemo(() => {
    const now = new Date();
    
    return expenses.filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      const expenseDate = new Date(expense.date);
      if (timeFilter === 'This Month') {
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      }
      if (timeFilter === 'Last 7 Days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return expenseDate >= sevenDaysAgo;
      }
      if (timeFilter === 'Last 30 Days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return expenseDate >= thirtyDaysAgo;
      }
      return true;
    });
  }, [expenses, searchQuery, timeFilter]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading expenses...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="page-title">Manage Expenses</h1>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontWeight: 600, margin: 0, color: 'var(--text-main)' }}>Your Expenses</h3>
          
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Search by title..." 
              className="input-field"
              style={{ width: '180px', padding: '0.5rem 1rem', margin: 0 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select 
              className="input-field" 
              style={{ width: '140px', padding: '0.5rem 1rem', margin: 0, cursor: 'pointer' }}
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option style={{ color: '#000' }} value="This Month">This Month</option>
              <option style={{ color: '#000' }} value="Last 7 Days">Last 7 Days</option>
              <option style={{ color: '#000' }} value="Last 30 Days">Last 30 Days</option>
              <option style={{ color: '#000' }} value="All Time">All Time</option>
            </select>
          </div>
        </div>

        <ExpenseList 
          expenses={filteredExpenses} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default Expenses;
