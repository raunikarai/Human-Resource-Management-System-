/**
 * API service for HRMS Lite
 * Handles all HTTP requests to the backend
 */
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============ Employee API ============

export const getEmployees = async () => {
  const response = await api.get('/employees')
  return response.data
}

export const createEmployee = async (employeeData) => {
  const response = await api.post('/employees', employeeData)
  return response.data
}

export const deleteEmployee = async (employeeId) => {
  await api.delete(`/employees/${employeeId}`)
}

// ============ Attendance API ============

export const getAttendance = async (employeeId, filterDate = null) => {
  let url = `/attendance/${employeeId}`
  if (filterDate) {
    url += `?filter_date=${filterDate}`
  }
  const response = await api.get(url)
  return response.data
}

export const markAttendance = async (attendanceData) => {
  const response = await api.post('/attendance', attendanceData)
  return response.data
}

export const getAttendanceSummary = async (employeeId) => {
  const response = await api.get(`/attendance/${employeeId}/summary`)
  return response.data
}

export default api
