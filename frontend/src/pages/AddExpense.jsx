import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';

const AddExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingExpense = location.state?.expense || null;

  const handleSuccess = () => {
    navigate('/expenses');
  };

  const handleCancel = () => {
    navigate('/expenses');
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="page-title">{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h1>
      </div>

      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ExpenseForm 
          onSuccess={handleSuccess} 
          initialData={editingExpense} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default AddExpense;
