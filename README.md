# 💸 MoneyMap - A Personal Expense Tracker (MERN Stack)

A real-time financial tracking application developed using the MERN stack, featuring secure authentication and dynamic data visualization.

---

## 📌 Overview
This project implements a full-stack expense management system with an enhanced user experience through responsive data entry, secure session handling, and interactive visual analytics. The application logic manages transactional CRUD operations, user-specific data isolation, and real-time spending summaries.

---

## ✨ Key Features
- **Secure Authentication**: JWT-based session management for login/signup
- **Data Visualization**: Real-time spending analytics via Recharts (Pie Chart)  
- **Full CRUD Operations**: Transactional management of expense records
- **Responsive Architecture**: Fluid layouts optimized for cross-platform accessibility  
- **Micro-Animations**: Smooth UI transitions for enhanced interactivity  

---

## 🛠️ Tech Stack
- **Language:** JavaScript 
- **Frontend:** React, Vite, Recharts 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  

---

## 🧠 Concepts Demonstrated
- Full-stack system architecture  
- RESTful API design and implementation  
- Middleware-based security (JWT & Auth)  
- Relational data modeling
- Component-driven UI development  

---

## 🚀 How to Run

### Prerequisites
- Node.js
- MongoDB instance  

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure
```
Expense-Tracker/
│── backend/
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Auth & Expense endpoints
│   ├── middleware/   # JWT security logic
│   └── server.js     # Server initialization
│── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application views
│   │   └── assets/     # Global design tokens
│   └── index.html
└── README.md
```

