import { useState } from 'react'

/**
 * Form to mark attendance for an employee
 */
function AttendanceForm({ employees, onAttendanceMarked }) {
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await onAttendanceMarked(formData)
      setSuccess('Attendance marked successfully!')
      setFormData((prev) => ({
        ...prev,
        employee_id: '',
        status: 'Present',
      }))
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to mark attendance'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Mark Attendance</h2>

      {error && <div className="message message-error">{error}</div>}
      {success && <div className="message message-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="employee_id">Employee *</label>
            <select
              id="employee_id"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || employees.length === 0}
          >
            {loading ? 'Marking...' : 'Mark Attendance'}
          </button>
          {employees.length === 0 && (
            <span style={{ color: '#888', fontSize: '0.875rem' }}>
              Add employees first to mark attendance
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default AttendanceForm
