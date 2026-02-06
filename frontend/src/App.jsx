import { useState } from 'react'
import EmployeeManagement from './pages/EmployeeManagement'
import AttendanceManagement from './pages/AttendanceManagement'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('employees')

  return (
    <div className="app">
      <header className="app-header">
        <h1>HRMS Lite</h1>
        <p>Human Resource Management System</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          Employee Management
        </button>
        <button
          className={`nav-btn ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance Management
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'employees' && <EmployeeManagement />}
        {activeTab === 'attendance' && <AttendanceManagement />}
      </main>

      <footer className="app-footer">
        <p>HRMS Lite © 2026 - Placement Assessment</p>
      </footer>
    </div>
  )
}

export default App
