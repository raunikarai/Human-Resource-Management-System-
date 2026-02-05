"""
Pydantic schemas for request/response validation.
Ensures data integrity and provides clear API contracts.
"""
import datetime
from typing import Literal
from pydantic import BaseModel, EmailStr, Field


# ============ Employee Schemas ============

class EmployeeCreate(BaseModel):
    """Schema for creating a new employee."""
    employee_id: str = Field(..., min_length=1, description="Unique employee identifier")
    full_name: str = Field(..., min_length=1, description="Employee's full name")
    email: EmailStr = Field(..., description="Valid email address")
    department: str = Field(..., min_length=1, description="Department name")


class EmployeeResponse(BaseModel):
    """Schema for employee responses."""
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str

    class Config:
        from_attributes = True


# ============ Attendance Schemas ============

class AttendanceCreate(BaseModel):
    """Schema for marking attendance."""
    employee_id: str = Field(..., min_length=1, description="Employee ID")
    date: datetime.date = Field(..., description="Attendance date (YYYY-MM-DD)")
    status: Literal["Present", "Absent"] = Field(..., description="Attendance status")


class AttendanceResponse(BaseModel):
    """Schema for attendance responses."""
    id: int
    employee_id: str
    date: datetime.date
    status: str

    class Config:
        from_attributes = True


# ============ Error Schema ============

class ErrorResponse(BaseModel):
    """Standard error response format."""
    detail: str
