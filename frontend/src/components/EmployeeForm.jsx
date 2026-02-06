import { useState } from 'react'

// Common corporate departments
const DEPARTMENTS = [
  'Human Resources',
  'Finance',
  'Accounting',
  'Information Technology',
  'Engineering',
  'Research & Development',
  'Sales',
  'Marketing',
  'Operations',
  'Customer Service',
  'Legal',
  'Administration',
  'Procurement',
  'Quality Assurance',
  'Product Management',
  'Business Development',
]

/**
 * Form to add a new employee
 */
function EmployeeForm({ onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
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
      await onEmployeeAdded(formData)
      setSuccess('Employee added successfully!')
      setFormData({ employee_id: '', full_name: '', email: '', department: '' })
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to add employee'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      
      {error && <div className="message message-error">{error}</div>}
      {success && <div className="message message-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="employee_id">Employee ID *</label>
            <input
              type="text"
              id="employee_id"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              placeholder="e.g., EMP001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="full_name">Full Name *</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm
