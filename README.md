## 🚗 Car Dealership Demo

A full-stack web application demonstrating modern enterprise application patterns using:

- ASP.NET Core (.NET 10) backend
- React (Vite) frontend
- RESTful API architecture
- Entity Framework Core with Azure SQL
- Azure App Service deployment

---

### 🌐 Live Demo

https://cardealershipdemo.azurewebsites.net

---

### 🔧 Key Highlights

- Modernized legacy project from .NET 5 → .NET 10
- Migrated frontend from Create React App → Vite for improved performance and maintainability
- Implemented full CRUD workflows for vehicle inventory management
- Designed RESTful APIs supporting real-world business operations
- Implemented dynamic filtering with real-time API queries (feature-based, mileage thresholds, strict matching)
- Added frontend and backend validation to enforce required fields and data integrity
- Designed user-friendly error handling with inline messaging for API responses
- Deployed full-stack application to Azure

---

### 🗄️ Data Layer

- Integrated Azure SQL Database for persistent storage
- Implemented Entity Framework Core for data access and schema management
- Created and applied migrations for database versioning
- Seeded realistic data to support application workflows

---

### 🏗️ Architecture

- Lightweight Clean Architecture-inspired structure:
  - **Core**: domain models and interfaces
  - **Infrastructure**: EF Core persistence and data access
  - **API**: controllers, services, and application composition
- Separation of concerns between domain, persistence, and API layers
- Designed for scalability without unnecessary complexity

---

### 🔁 Data Lifecycle & Integrity

- Implemented **soft-delete behavior** using an `IsActive` flag to preserve historical data
- Centralized audit field management (`CreatedDate`, `ModifiedDate`) using EF Core change tracking
- Used surrogate keys for entity identity, allowing flexibility for business workflows and data preservation

---

### 🧠 What This Demonstrates

- Full-stack development across backend and frontend layers
- API-driven architecture and data flow
- Application modernization and migration strategies
- Real-world data handling (auditability, soft deletes, integrity)
- Cloud deployment and environment configuration
- Interactive UI patterns with real-time filtering and user-driven queries

---

### ☁️ Deployment

- Hosted on Azure App Service
- Azure SQL used for relational data storage
- Environment-based configuration for cloud deployment

---

### 🎛️ User Experience & Interaction

- Real-time filtering of vehicle inventory via API-driven queries
- Feature-based filtering (e.g., drivetrain, navigation, power features)
- Adjustable mileage threshold with configurable limits
- Optional "strict matching" mode (match all vs any selected filters)
- Instant UI updates based on filter changes
- Ability to reset all filters in a single action
- Frontend validation with immediate feedback for required fields
- Backend validation to ensure data integrity across requests
- Graceful error handling with user-facing alert messages (non-blocking UI)

---

### 🧾 Project Background

This project originated from a real-world take-home assignment, which included requirements for dynamic filtering and interactive data queries. It has since been expanded and modernized to incorporate a relational data layer, updated frontend tooling, and cloud deployment on Azure.
