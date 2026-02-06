/**
 * Displays attendance records with filter by date
 */
function AttendanceList({ records, loading, summary }) {
  if (loading) {
    return <div className="loading">Loading attendance records</div>
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Attendance Records</h2>
        {summary !== null && (
          <div className="summary-card">
            Total Present Days: <strong>{summary}</strong>
          </div>
        )}
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <p>No attendance records found.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.employee_id}</td>
                  <td>{record.date}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        record.status === 'Present'
                          ? 'status-present'
                          : 'status-absent'
                      }`}
                    >
                      {record.status}
                    </span>
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

export default AttendanceList
