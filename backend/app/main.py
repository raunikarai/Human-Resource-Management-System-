"""
HRMS Lite - Main FastAPI Application
A lightweight Human Resource Management System.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .database import engine, Base
from .routes import employees, attendance

# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="HRMS Lite API",
    description="A lightweight Human Resource Management System for managing employees and attendance.",
    version="1.0.0"
)

# CORS configuration - allow frontend origins
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(employees.router)
app.include_router(attendance.router)


@app.get("/", tags=["Health"])
def health_check():
    """Health check endpoint to verify API is running."""
    return {"status": "healthy", "message": "HRMS Lite API is running"}


@app.get("/api/info", tags=["Health"])
def api_info():
    """Get API information."""
    return {
        "name": "HRMS Lite API",
        "version": "1.0.0",
        "endpoints": {
            "employees": "/employees",
            "attendance": "/attendance"
        }
    }
