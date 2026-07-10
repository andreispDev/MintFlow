# MintFlow

An intermediate-to-advanced full-stack Admin Dashboard built with **React.js**, **Supabase**, and **Tailwind CSS**. The application provides user authentication, role-based access control, project management, task management with Kanban boards, analytics, and report generation with export capabilities.

---

## 🚀 Features

### 🔐 Authentication

- Login
- Register
- Forgot Password
- Persistent Login Session
- Protected Routes
- Role-Based Authorization

### 👥 User Management

- View all users
- Search users
- Filter by role
- Update user roles
- User profile modal
- Admin-only access

Roles:

- Admin
- Manager
- Employee

---

## 📊 Dashboard

Dashboard Overview includes:

- Total Users
- Total Projects
- Total Tasks
- Task Status Statistics
- Project Progress
- Analytics Charts

---

## 📁 Project Management

- Create Project
- Edit Project
- Delete Project
- Project Progress
- Project Status

Project Status

- Planning
- Active
- On Hold
- Completed

Project Details

- Description
- Creator
- Priority
- Progress Bar
- Team Members

---

## 👨‍💻 Team Management

Assign employees to projects.

Features

- Add team members
- Remove team members
- View assigned members

---

## ✅ Task Management

Every project has its own Kanban Board.

Features

- Create Tasks
- Assign Employees
- Due Dates
- Priority
- Status

Task Status

- Todo
- In Progress
- Done

Task Priority

- Low
- Medium
- High

---

## 📌 Kanban Board

Drag & Drop support using:

- @hello-pangea/dnd

Move tasks between:

Todo

↓

In Progress

↓

Done

Changes are automatically saved to Supabase.

---

## 💬 Task Collaboration

- Task Comments
- Task Activity History
- Task Details Modal

---

## 📈 Reports

Generate reports for:

- Users
- Projects
- Tasks

Supported Export Formats

- CSV
- Excel (.xlsx)
- PDF

Libraries Used

- xlsx
- jspdf
- jspdf-autotable
- file-saver

---

## 🤖 AI Ready

The project includes an AI Assistant placeholder for future integration.

Possible AI features:

- Project summaries
- Task prioritization
- Workload analysis
- Report generation
- Deadline predictions
- Productivity insights

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Recharts
- Hello Pangea DnD

### Backend

- Supabase

Services Used

- Authentication
- PostgreSQL Database
- Row Level Security
- Storage (optional)

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── dashboard/
│   ├── CreateProject.jsx
│   ├── CreateTask.jsx
│   ├── EditProject.jsx
│   ├── EditTask.jsx
│   ├── TaskBoard.jsx
│   ├── UserModal.jsx
│   ├── AssignMembers.jsx
│   ├── DashboardStats.jsx
│   ├── AIReport.jsx
│   └── ...
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Users.jsx
│   ├── Projects.jsx
│   ├── ProjectDetails.jsx
│   ├── Reports.jsx
│   └── MyTasks.jsx
│
├── services/
│   ├── projects.js
│   ├── tasks.js
│   ├── reports.js
│   └── projectMembers.js
│
├── context/
│   └── AuthContext.jsx
│
├── utils/
│   └── export.js
│
└── lib/
    └── supabase.js
```

---

## 🗄 Database

Main Tables

```
profiles

projects

project_members

tasks

task_comments

task_activity
```

Relationships

```
Profiles
    │
    ├────────────┐
    │            │
Projects     Tasks
    │            │
    │            │
Project Members  Comments
```

---

## 🔐 Authentication Flow

```
Register

↓

Supabase Authentication

↓

Profiles Table

↓

Login

↓

Protected Routes

↓

Dashboard
```

---

## 📋 Report Flow

```
Supabase Database

↓

Reports Service

↓

React Dashboard

↓

CSV

Excel

PDF
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/ai-admin-dashboard.git
```

Navigate into the project

```bash
cd ai-admin-dashboard
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## ⚙ Environment Variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## 📦 Required Packages

```bash
npm install @supabase/supabase-js
npm install react-router-dom
npm install @hello-pangea/dnd
npm install recharts
npm install jspdf
npm install jspdf-autotable
npm install xlsx
npm install file-saver
```

---

## 🎯 Learning Objectives

This project demonstrates:

- React Hooks
- Context API
- React Router
- CRUD Operations
- Authentication
- Authorization
- Database Relationships
- Kanban Board
- Drag & Drop
- Dashboard Analytics
- Report Generation
- Exporting Data
- Supabase Integration
- Responsive UI Design

---

## 📌 Future Improvements

- AI-powered analytics
- Email notifications
- Real-time updates
- File uploads with Supabase Storage
- Calendar integration
- Gantt chart
- Dark mode
- Audit logs
- Multi-organization support
- API documentation
- Unit and integration testing
- Docker support
- CI/CD pipeline
- Deployment to Vercel

---

## 📄 License

This project is intended for educational and portfolio purposes. You are free to modify and extend it for personal learning or showcase projects.

---

## 👨‍💻 Author

Developed using:

- React.js
- Supabase
- Tailwind CSS
- JavaScript (ES6+)

Built as an intermediate full-stack portfolio project demonstrating modern web application development with authentication, project management, task tracking, analytics, and reporting.
