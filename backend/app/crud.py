"""
CRUD operations for Employee and Attendance.
Keeps database logic separate from route handlers.
"""
from datetime import date
from typing import Optional
from sqlalchemy.orm import Session
from . import models, schemas


# ============ Employee CRUD ============

def get_employee_by_id(db: Session, employee_id: str) -> Optional[models.Employee]:
    """Fetch a single employee by their employee_id."""
    return db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()


def get_all_employees(db: Session) -> list[models.Employee]:
    """Fetch all employees."""
    return db.query(models.Employee).all()


def create_employee(db: Session, employee: schemas.EmployeeCreate) -> models.Employee:
    """Create a new employee record."""
    db_employee = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def delete_employee(db: Session, employee_id: str) -> bool:
    """Delete an employee by their employee_id. Returns True if deleted."""
    employee = get_employee_by_id(db, employee_id)
    if employee:
        db.delete(employee)
        db.commit()
        return True
    return False


# ============ Attendance CRUD ============

def get_attendance_by_employee(
    db: Session,
    employee_id: str,
    filter_date: Optional[date] = None
) -> list[models.Attendance]:
    """Fetch attendance records for an employee, optionally filtered by date."""
    query = db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id)
    if filter_date:
        query = query.filter(models.Attendance.date == filter_date)
    return query.order_by(models.Attendance.date.desc()).all()


def get_attendance_by_employee_and_date(
    db: Session,
    employee_id: str,
    attendance_date: date
) -> Optional[models.Attendance]:
    """Check if attendance already exists for a given employee and date."""
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == attendance_date
    ).first()


def create_attendance(db: Session, attendance: schemas.AttendanceCreate) -> models.Attendance:
    """Create a new attendance record."""
    db_attendance = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


def count_present_days(db: Session, employee_id: str) -> int:
    """Count total present days for an employee."""
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.status == "Present"
    ).count()
