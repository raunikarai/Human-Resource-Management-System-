/**
 * Displays list of employees with delete action
 */
function EmployeeList({ employees, loading, onDelete }) {
  if (loading) {
    return <div className="loading">Loading employees</div>
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Employees</h2>
        <span className="list-count">{employees.length} total</span>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">
          <p>No employees found. Add your first employee above.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.full_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(employee.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EmployeeList
