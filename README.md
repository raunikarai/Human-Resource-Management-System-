# HRMS Lite - Human Resource Management System

A production-ready, lightweight HRMS application featuring employee CRUD operations and daily attendance tracking.

## 🌐 Live Demo

- **Frontend**: [https://human-resource-management-system-sigma.vercel.app](https://human-resource-management-system-sigma.vercel.app)
- **Backend API**: [https://human-resource-management-system-7hb4.onrender.com](https://human-resource-management-system-7hb4.onrender.com)

---

## 📋 Project Overview

HRMS Lite is a simple yet functional Human Resource Management System that allows organizations to:

- **Employee Management**: Add, view, update, and delete employee records
- **Attendance Tracking**: Mark daily attendance (Present/Absent) for employees
- **Department Organization**: Categorize employees by department (HR, Engineering, Sales, Marketing, Finance, Operations)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Library |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3.11+** | Programming language |
| **FastAPI** | Web framework |
| **SQLAlchemy** | ORM for database operations |
| **Pydantic** | Data validation |
| **Uvicorn** | ASGI server |

### Database
| Technology | Purpose |
|------------|---------|
| **PostgreSQL (Neon)** | Production database |
| **psycopg2** | PostgreSQL adapter |

### Deployment
| Platform | Service |
|----------|---------|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **Neon** | PostgreSQL database |

---

## 🚀 Steps to Run the Project Locally

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.11 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/raunikarai/Human-Resource-Management-System-.git
cd Human-Resource-Management-System-
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file with your database URL
# Example:
# DATABASE_URL=postgresql://user:password@host:port/database
# ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Run the backend server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The backend will be available at: `http://127.0.0.1:8000`

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
# VITE_API_URL=http://127.0.0.1:8000

# Run the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

---

## 📁 Project Structure

```
Human-Resource-Management-System-/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI application entry point
│   │   ├── database.py      # Database configuration
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── crud.py          # CRUD operations
│   │   └── routes/
│   │       ├── employees.py # Employee endpoints
│   │       └── attendance.py# Attendance endpoints
│   ├── requirements.txt
│   ├── Procfile
│   └── render.yaml
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ⚠️ Assumptions & Limitations

### Assumptions
1. **Single Organization**: The system is designed for a single organization; multi-tenancy is not supported
2. **Daily Attendance**: Attendance is tracked on a daily basis (one entry per employee per day)
3. **Predefined Departments**: Departments are predefined (HR, Engineering, Sales, Marketing, Finance, Operations)
4. **No Authentication**: The current version does not include user authentication/authorization

### Limitations
1. **No User Authentication**: Anyone with access to the URL can manage employees and attendance
2. **No Role-Based Access Control**: All users have full access to all features
3. **No Reporting**: Advanced reporting and analytics features are not included
4. **No Leave Management**: Leave requests and approvals are not part of this version
5. **No Payroll Integration**: Salary and payroll features are not included
6. **Render Free Tier**: Backend may spin down after 15 minutes of inactivity (cold start delay)

### Future Enhancements
- User authentication (JWT-based)
- Role-based access control (Admin, HR, Employee)
- Leave management module
- Attendance reports and analytics
- Employee document management
- Email notifications

---

## 📝 API Endpoints

### Health Check
- `GET /` - API health status

### Employees
- `GET /employees` - List all employees
- `POST /employees` - Create new employee
- `GET /employees/{id}` - Get employee by ID
- `PUT /employees/{id}` - Update employee
- `DELETE /employees/{id}` - Delete employee

### Attendance
- `GET /attendance` - List attendance records
- `POST /attendance` - Mark attendance
- `GET /attendance/employee/{employee_id}` - Get attendance by employee

---

## 👩‍💻 Author

**Raunika Rai**

---

## 📄 License

This project is licensed under the MIT License.
