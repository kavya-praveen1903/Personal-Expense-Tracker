import React from 'react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No expenses found. Add one to get started!</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td style={{ fontWeight: 500 }}>{expense.title}</td>
              <td>
                <span style={{ 
                  background: 'rgba(99, 102, 241, 0.2)', 
                  color: '#818cf8',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem'
                }}>
                  {expense.category}
                </span>
              </td>
              <td style={{ fontWeight: 600 }}>₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => onEdit(expense)} 
                    className="btn btn-small"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(expense._id)} 
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
