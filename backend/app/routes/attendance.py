"""
Attendance management endpoints.
Handles marking and retrieving attendance records.
"""
from datetime import date
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post(
    "",
    response_model=schemas.AttendanceResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        400: {"model": schemas.ErrorResponse},
        404: {"model": schemas.ErrorResponse}
    }
)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    """
    Mark attendance for an employee.
    
    - **employee_id**: Must be a valid existing employee
    - **date**: Date in YYYY-MM-DD format
    - **status**: Either "Present" or "Absent"
    """
    # Verify employee exists
    employee = crud.get_employee_by_id(db, attendance.employee_id)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{attendance.employee_id}' not found"
        )
    
    # Check for duplicate attendance on same date
    existing = crud.get_attendance_by_employee_and_date(db, attendance.employee_id, attendance.date)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attendance for '{attendance.employee_id}' on {attendance.date} already recorded"
        )
    
    return crud.create_attendance(db, attendance)


@router.get(
    "/{employee_id}",
    response_model=list[schemas.AttendanceResponse],
    responses={404: {"model": schemas.ErrorResponse}}
)
def get_employee_attendance(
    employee_id: str,
    filter_date: Optional[date] = Query(None, description="Filter by specific date"),
    db: Session = Depends(get_db)
):
    """
    Get attendance records for a specific employee.
    
    - Optionally filter by a specific date
    - Returns records sorted by date (newest first)
    """
    # Verify employee exists
    employee = crud.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{employee_id}' not found"
        )
    
    return crud.get_attendance_by_employee(db, employee_id, filter_date)


@router.get(
    "/{employee_id}/summary",
    responses={404: {"model": schemas.ErrorResponse}}
)
def get_attendance_summary(employee_id: str, db: Session = Depends(get_db)):
    """
    Get attendance summary for an employee.
    Returns total present days count.
    """
    # Verify employee exists
    employee = crud.get_employee_by_id(db, employee_id)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{employee_id}' not found"
        )
    
    present_days = crud.count_present_days(db, employee_id)
    return {
        "employee_id": employee_id,
        "total_present_days": present_days
    }
