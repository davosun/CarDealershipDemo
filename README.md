## 🚗 Car Dealership Demo

A full-stack web application demonstrating modern enterprise application patterns, including API-driven architecture, relational data modeling, and cloud deployment on Azure.

---

### 🧰 Tech Stack

- Backend: ASP.NET Core (.NET 10)
- Frontend: React (Vite)
- Data: Azure SQL, Entity Framework Core
- Cloud: Azure App Service

---

### 🌐 Live Demo

**Application:**
https://cardealershipdemo.azurewebsites.net

> ⚠️ Note: The live demo uses a cost-optimized Azure SQL tier that may pause after inactivity. 
> The first request after idle periods can take up to ~60 seconds to respond due to database warm-up in a serverless/cost-optimized configuration.

---

### 🎥 Demo Video

https://github.com/user-attachments/assets/a74f8742-1c5c-4a54-bb55-dc56d4f7c732

---

### 🔧 Key Highlights

- Modernized legacy project from .NET 5 → .NET 10
- Migrated frontend from Create React App → Vite for improved performance and maintainability
- Implemented full CRUD workflows for vehicle inventory management
- Designed RESTful APIs for real-world business workflows
- Implemented dynamic filtering with real-time API queries (feature-based, mileage thresholds, strict matching)
- Implemented frontend and backend validation to enforce data integrity
- Implemented user-friendly error handling with inline messaging for API responses
- Deployed full-stack application to Azure

---

### 🧠 What This Demonstrates

- Full-stack development across backend and frontend layers
- API-driven architecture and data flow
- Application modernization and migration strategies
- Real-world data handling (auditability, soft deletes, integrity)
- Cloud deployment and environment configuration
- Interactive UI patterns with real-time filtering and user-driven queries

---

### 🎛️ User Experience & Interaction

- Real-time filtering of vehicle inventory via API-driven queries
- Feature-based filtering (e.g., drivetrain, navigation, power features)
- Adjustable mileage threshold with configurable limits
- Optional "strict matching" mode (match all vs any selected filters)
- Instant UI updates based on filter changes
- Ability to reset all filters in a single action
- Frontend validation with immediate feedback for required fields
- Graceful error handling with user-facing alert messages (non-blocking UI)

---

### 🗄️ Data Layer

- Integrated Azure SQL Database for persistent storage
- Implemented Entity Framework Core for data access and schema management
- Created and applied migrations for database versioning
- Seeded realistic data for demonstration and testing

---

### 🏗️ Architecture

- Lightweight Clean Architecture-inspired structure:
  - **Core**: domain models and interfaces
  - **Infrastructure**: EF Core persistence and data access
  - **API**: controllers, services, and application composition
- Separation of concerns between domain, persistence, and API layers
- Designed for scalability while avoiding unnecessary complexity

---

### 🔁 Data Lifecycle & Integrity

- Implemented **soft-delete behavior** using an `IsActive` flag to preserve historical data
- Centralized audit field management (`CreatedDate`, `ModifiedDate`) using EF Core change tracking
- Used surrogate keys for entity identity, allowing flexibility for business workflows and data preservation

---

### 🔐 Security & Configuration

- Uses Azure system-assigned managed identity for passwordless access to Azure SQL
- Stores runtime configuration in Azure App Service environment settings without embedding credentials in source code
- Limits API documentation tooling to local/development environments
- Authentication and authorization intentionally omitted to keep the demo publicly accessible and focused on core application behavior
- Production next steps would include role-based authorization, Azure Key Vault, separate deployment slots, staging validation, and App Service slot swaps for safer releases and rollback

---

### ☁️ Cloud & Deployment

- Hosted on Azure App Service
- Azure SQL used for relational data storage
- Environment-based configuration for cloud deployment
- Uses GitHub-managed secrets for CI/CD deployment workflows
- Demonstrates secure, credential-free database access using managed identity

---

### 🧾 Project Background

This project originated from a real-world consulting-style take-home assignment where I selected the car dealership domain with a .NET Web API and React frontend. I chose this combination because it aligned with my background while providing clear, business-oriented filtering requirements. It has since been expanded and modernized with Azure SQL, EF Core, full CRUD workflows, updated frontend tooling, and cloud deployment on Azure.
