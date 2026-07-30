# Personal Finance Dashboard

A comprehensive, full-stack Personal Finance Management system built with **React**, **Tailwind CSS**, **Spring Boot**, and **MySQL**. The application features a modern fintech-style UI, interactive dashboards, and robust API security.

## Features

- **Dashboard Analytics**: Visualizes income, expenses, and cash flow using Recharts.
- **Income & Expense Tracking**: Log daily transactions and categorize them.
- **Investment Portfolio**: Track assets (Stocks, Crypto, Real Estate) and calculate live profit/loss.
- **Savings Goals**: Set up financial goals, track progress, and view deadlines.
- **EMI Calculator/Tracker**: Calculate and track loan EMIs.
- **Real-time Notifications**: Get instantly notified when new transactions or goals are created via a global Axios interceptor.
- **Admin Panel**: Exclusive dashboard for administrators to view and manage all registered users.
- **Student Details**: Tracks basic student information and automatically seeds default records on startup.
- **Secure Authentication**: JWT-based stateless authentication with password hashing using BCrypt.

## Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Tailwind CSS v4
- Recharts (Data Visualization)
- Framer Motion (Animations)
- Context API (Global State Management)
- Axios & React Toastify

**Backend:**
- Java 21
- Spring Boot 3.x
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL Database

## Getting Started

### Prerequisites
- Node.js (v18+)
- Java JDK 21
- MySQL Server (Local) or a Remote Database (e.g., Railway)

### Backend Setup
1. Navigate to the `backend/` directory.
2. Open `src/main/resources/application.properties` and ensure your MySQL credentials match your Railway database (or local setup):
   ```properties
   spring.datasource.url=jdbc:mysql://sakura.proxy.rlwy.net:56258/railway?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=wdQDYdiwRHqIRpzgxxzUSURytCHiGSMx
   ```
3. Run the backend using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
4. On the first run, the database (`financedb`) and all necessary tables will be automatically created. The backend seeds 1 Admin user and 5 mock member accounts by default.

### Frontend Setup
1. Navigate to the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser.

## Demo Accounts

You can immediately test the application using the auto-seeded accounts. The backend `AdminSeeder` runs on startup and initializes these credentials:

**Admin Account:**
- **Email:** `admin@finance.com`
- **Password:** `admin123`
*(Has exclusive access to the Admin Panel)*

**Member Accounts:**
- **Emails:** `member1@finance.com`, `member2@finance.com` ... up to `member5@finance.com`
- **Password:** `password123`

## Architecture Highlights
- **Global Axios Interceptor**: Automatically listens to `POST`, `PUT`, and `DELETE` requests globally and dispatches real-time UI notifications without prop-drilling.
- **JWT Filter**: Intercepts every secure request, validating the Bearer token without relying on server-side HTTP sessions.
- **Dynamic CORS Configuration**: Backend natively supports cross-origin requests from typical Vite development ports (`5173`, `5174`).

---
*Designed for software engineering portfolios and practical application building.*
