import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import api from '../api';
import ExpenseChart from '../components/ExpenseChart';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('All Time');

  const fetchData = async () => {
    try {
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

  const filteredExpenses = useMemo(() => {
    const now = new Date();
    
    return expenses.filter(expense => {
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
  }, [expenses, timeFilter]);

  const summary = useMemo(() => {
    let total = 0;
    const catMap = {};
    
    filteredExpenses.forEach(exp => {
      total += exp.amount;
      catMap[exp.category] = (catMap[exp.category] || 0) + exp.amount;
    });

    const breakdown = Object.keys(catMap).map(key => ({
      name: key,
      value: catMap[key]
    }));

    return { total, breakdown };
  }, [filteredExpenses]);

  const topCategory = summary.breakdown.length > 0 
    ? summary.breakdown.reduce((max, cat) => cat.value > max.value ? cat : max, summary.breakdown[0])
    : null;

  return (
    <div className="dashboard-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">Welcome back, {user?.name}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Here is your financial overview.</p>
        </div>
        
        <select 
          className="input-field" 
          style={{ width: '160px', padding: '0.6rem 1rem', margin: 0, cursor: 'pointer' }}
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option style={{ color: '#000' }} value="This Month">This Month</option>
          <option style={{ color: '#000' }} value="Last 7 Days">Last 7 Days</option>
          <option style={{ color: '#000' }} value="Last 30 Days">Last 30 Days</option>
          <option style={{ color: '#000' }} value="All Time">All Time</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading dashboard data...</div>
      ) : (
        <div className="dashboard-grid">
          <div className="glass-card stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>₹</div>
              <h3 className="stat-title" style={{ margin: 0 }}>
                {timeFilter === 'This Month' ? 'Monthly Expenses' : `${timeFilter} Expenses`}
              </h3>
            </div>
            <div className="stat-value">₹{summary.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            
            {topCategory && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                <span>Highest Spend:</span>
                <span style={{ color: 'var(--primary-color)', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {topCategory.name}
                </span>
              </div>
            )}
          </div>
          
          <div className="glass-card">
            <h3 className="stat-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Expense Breakdown</h3>
            <ExpenseChart data={summary.breakdown} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
