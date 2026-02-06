import { useState, useEffect } from 'react'
import {
  getEmployees,
  getAttendance,
  markAttendance,
  getAttendanceSummary,
} from '../services/api'
import AttendanceForm from '../components/AttendanceForm'
import AttendanceList from '../components/AttendanceList'

/**
 * Attendance Management Page
 * Handles marking and viewing attendance records
 */
function AttendanceManagement() {
  const [employees, setEmployees] = useState([])
  const [attendance, setAttendance] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  // Fetch attendance when employee or filter changes
  useEffect(() => {
    if (selectedEmployee) {
      fetchAttendance()
      fetchSummary()
    } else {
      setAttendance([])
      setSummary(null)
    }
  }, [selectedEmployee, filterDate])

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      setError('Failed to load employees')
      console.error('Error fetching employees:', err)
    }
  }

  const fetchAttendance = async () => {
    try {
      setLoading(true)
      const data = await getAttendance(selectedEmployee, filterDate || null)
      setAttendance(data)
      setError('')
    } catch (err) {
      setError('Failed to load attendance records')
      console.error('Error fetching attendance:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSummary = async () => {
    try {
      const data = await getAttendanceSummary(selectedEmployee)
      setSummary(data.total_present_days)
    } catch (err) {
      console.error('Error fetching summary:', err)
    }
  }

  const handleMarkAttendance = async (attendanceData) => {
    await markAttendance(attendanceData)
    // Refresh if viewing the same employee
    if (selectedEmployee === attendanceData.employee_id) {
      await fetchAttendance()
      await fetchSummary()
    }
  }

  return (
    <div className="page">
      {error && <div className="message message-error">{error}</div>}

      <AttendanceForm employees={employees} onAttendanceMarked={handleMarkAttendance} />

      {/* Attendance Viewer */}
      <div className="form-container">
        <h2>View Attendance Records</h2>
        <div className="filter-group">
          <div className="form-group">
            <label htmlFor="view-employee">Select Employee</label>
            <select
              id="view-employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select to view records</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filter-date">Filter by Date (optional)</label>
            <input
              type="date"
              id="filter-date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              disabled={!selectedEmployee}
            />
          </div>

          {filterDate && (
            <button
              className="btn btn-primary"
              onClick={() => setFilterDate('')}
              style={{ marginBottom: '0.25rem' }}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {selectedEmployee && (
        <AttendanceList records={attendance} loading={loading} summary={summary} />
      )}

      {!selectedEmployee && (
        <div className="list-container">
          <div className="empty-state">
            <p>Select an employee above to view their attendance records.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceManagement
