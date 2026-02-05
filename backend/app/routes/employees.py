"""
Employee management endpoints.
Handles CRUD operations for employee records.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post(
    "",
    response_model=schemas.EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
    responses={400: {"model": schemas.ErrorResponse}}
)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    """
    Create a new employee.
    
    - **employee_id**: Unique identifier (must not already exist)
    - **full_name**: Employee's full name
    - **email**: Valid email address
    - **department**: Department name
    """
    # Check for duplicate employee_id
    existing = crud.get_employee_by_id(db, employee.employee_id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with ID '{employee.employee_id}' already exists"
        )
    
    return crud.create_employee(db, employee)


@router.get("", response_model=list[schemas.EmployeeResponse])
def get_all_employees(db: Session = Depends(get_db)):
    """
    Retrieve all employees.
    Returns an empty list if no employees exist.
    """
    return crud.get_all_employees(db)


@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={404: {"model": schemas.ErrorResponse}}
)
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    """
    Delete an employee by their employee_id.
    Also deletes all associated attendance records.
    """
    deleted = crud.delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID '{employee_id}' not found"
        )
    return None
