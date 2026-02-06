import { useState, useEffect } from 'react'
import { getEmployees, createEmployee, deleteEmployee } from '../services/api'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeList from '../components/EmployeeList'

/**
 * Employee Management Page
 * Handles listing, adding, and deleting employees
 */
function EmployeeManagement() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const data = await getEmployees()
      setEmployees(data)
      setError('')
    } catch (err) {
      setError('Failed to load employees. Is the backend running?')
      console.error('Error fetching employees:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = async (employeeData) => {
    await createEmployee(employeeData)
    await fetchEmployees()
  }

  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm(`Are you sure you want to delete employee ${employeeId}?`)) {
      return
    }
    try {
      await deleteEmployee(employeeId)
      await fetchEmployees()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete employee')
    }
  }

  return (
    <div className="page">
      {error && <div className="message message-error">{error}</div>}
      
      <EmployeeForm onEmployeeAdded={handleAddEmployee} />
      
      <EmployeeList
        employees={employees}
        loading={loading}
        onDelete={handleDeleteEmployee}
      />
    </div>
  )
}

export default EmployeeManagement
