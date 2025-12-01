# University FYP Management System

A comprehensive web-based system for managing Final Year Projects at Bahria University, implementing the complete SRS requirements including proposal management, progress tracking, defense scheduling, evaluation, and analytics.

## 📋 Overview

This system digitizes and automates the complete lifecycle of Final Year Projects, eliminating physical paperwork and reducing administrative overhead. Built with:

- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **Authentication:** JWT with bcrypt password hashing
- **UI Components:** Radix UI + Shadcn/ui

## 🎯 Key Features (Based on SRS v4.0)

### ✅ Implemented Features

#### Epic 1: Proposal Management
- ✅ UC-02: Submit Project Proposal
- ✅ UC-10: Approve/Reject Proposal with digital signatures
- ✅ Supervisor quota management (max 5 groups)
- ✅ Auto-generated Project IDs (YYYY-DEPT-###)

#### Epic 2: Progress Tracking
- ✅ UC-04: Submit Weekly Logs (24 required)
- ✅ UC-11: Digital log signing by supervisors
- ✅ Document upload support (SRS, SDS, Thesis)
- ✅ Monthly evaluation submissions

#### Epic 4: Evaluation & Grading
- ✅ Defense evaluation with rubric (Presentation 20%, Demo 40%, Q&A 20%, Report 20%)
- ✅ Aggregated scoring from multiple evaluators
- ✅ Grade approval workflow

#### Epic 5: Analytics & Reporting
- ✅ UC-27: Real-time notification system
- ✅ Dashboard analytics for all roles
- ✅ Progress tracking with visual indicators

#### Epic 6: Security & Access Control
- ✅ UC-01: User registration with email verification
- ✅ UC-36: Change password functionality
- ✅ UC-37: Password reset with secure tokens
- ✅ UC-38: Secure logout
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication (24-hour expiration)
- ✅ Account lockout after 5 failed attempts (30 min lock)

### 🚧 In Progress / To Be Completed

- Defense scheduling automation (UC-16, UC-17, UC-18)
- File upload with virus scanning
- Email notifications via SendGrid/SMTP
- Coordinator dashboard enhancements
- HOD analytics and policy overrides
- Tablet-optimized evaluator interface

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ and npm
- MongoDB v5.0+ (local or MongoDB Atlas)
- Git

### 1. Clone Repository

```bash
cd "C:\Users\Laptop inn\Desktop\FYP_Figma"
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your configuration
# Set MongoDB URI, JWT secret, email credentials, etc.

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate back to root
cd ..

# Install dependencies
npm install

# Create .env file
echo VITE_API_URL=http://localhost:5000/api > .env

# Start frontend dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
FYP_Figma/
├── server/                    # Backend API
│   ├── models/               # MongoDB schemas
│   │   ├── User.js          # User schema (students, supervisors, etc.)
│   │   ├── Project.js       # Project/proposal schema
│   │   ├── Log.js           # Weekly log schema
│   │   ├── Defense.js       # Defense and evaluation schema
│   │   └── Notification.js  # Notification schema
│   ├── routes/              # API endpoints
│   │   ├── auth.js          # Authentication routes
│   │   ├── users.js         # User management
│   │   ├── projects.js      # Proposal management
│   │   ├── logs.js          # Log management
│   │   ├── defenses.js      # Defense scheduling
│   │   └── notifications.js # Notification system
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # JWT authentication
│   ├── utils/               # Helper functions
│   │   └── email.js         # Email service
│   ├── server.js            # Express app entry point
│   └── package.json
│
├── src/                      # Frontend React app
│   ├── components/
│   │   ├── student/         # Student dashboard
│   │   ├── supervisor/      # Supervisor dashboard
│   │   ├── coordinator/     # Coordinator dashboard
│   │   ├── evaluator/       # Evaluator interface
│   │   ├── hod/            # HOD dashboard
│   │   ├── layout/         # Header, Sidebar
│   │   ├── ui/             # Reusable UI components (Radix UI)
│   │   └── LoginPage.tsx   # Login component
│   ├── context/
│   │   └── AuthContext.jsx # Authentication context
│   ├── utils/
│   │   └── api.js          # Axios API client
│   ├── App.tsx             # Main app with routing
│   └── main.tsx            # React entry point
│
└── README.md
```

## 🔑 Environment Variables

### Backend (.env in /server)

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/fyp_management

# JWT
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=24h

# Email (for production)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@bu.edu.pk
EMAIL_PASSWORD=your-app-password

# File Upload
MAX_FILE_SIZE=104857600
UPLOAD_DIR=./uploads

# Client URL
CLIENT_URL=http://localhost:5173
```

### Frontend (.env in root)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the System

### 1. Create Test Users

Use the registration endpoint or create directly in MongoDB:

```javascript
// Student account
{
  "name": "Ahmed Ali",
  "email": "ahmed.ali@bu.edu.pk",
  "password": "Test1234",
  "role": "student",
  "studentId": "21-123-456"
}

// Supervisor account
{
  "name": "Dr. Sara Khan",
  "email": "sara.khan@bu.edu.pk",
  "password": "Test1234",
  "role": "supervisor"
}
```

### 2. Test Workflow

1. **Register** → Create account → Verify email
2. **Login** → Use credentials → Receive JWT token
3. **Submit Proposal** (Student) → Fill form → Select supervisor
4. **Approve Proposal** (Supervisor) → Review → Approve with digital signature
5. **Submit Logs** (Student) → Add weekly progress → Attach files
6. **Sign Logs** (Supervisor) → Review logs → Digital signature
7. **Register Defense** (Student) → Meet requirements (24 logs, SRS approved)
8. **Evaluate Defense** (Evaluator) → Score presentation, demo, Q&A, report
9. **Approve Grades** (HOD) → Review scores → Publish results

## 📊 Database Schema

### Collections

1. **users** - All system users (students, supervisors, coordinators, evaluators, HOD)
2. **projects** - Project proposals and metadata
3. **logs** - Weekly progress logs
4. **defenses** - Defense schedules and evaluations
5. **notifications** - System notifications

See `server/models/` for complete schema definitions matching SRS Data Dictionary (Section 7.2).

## 🔒 Security Features (Per SRS Requirements)

- ✅ **SEC-1:** Password hashing with bcrypt (work factor 10)
- ✅ **SEC-2:** HTTPS enforcement (production)
- ✅ **SEC-3:** Role-Based Access Control (RBAC)
- ✅ **SEC-4:** Account lockout after 5 failed attempts (30 min)
- ✅ **SEC-5:** CSRF protection
- ✅ **SEC-6:** XSS protection via input sanitization
- ✅ **SEC-7:** SQL/NoSQL injection prevention
- ✅ **SEC-9:** JWT token expiration (24 hours)
- ✅ **SEC-10:** Authentication logging

## 📈 Performance Requirements (Per SRS)

- **PERF-1:** Supports 500+ concurrent users
- **PERF-2:** Page load time < 2 seconds (10 Mbps)
- **PERF-3:** API response time < 500ms (95th percentile)
- **AVAIL-1:** 99.9% uptime during business hours

## 🛠️ API Endpoints

### Authentication
```
POST /api/auth/register         # Register new user
GET  /api/auth/verify-email/:token  # Verify email
POST /api/auth/login            # Login
POST /api/auth/forgot-password  # Request password reset
POST /api/auth/reset-password   # Reset password
```

### Projects
```
POST /api/projects              # Submit proposal (UC-02)
GET  /api/projects              # Get all projects (filtered by role)
PATCH /api/projects/:id/proposal-decision  # Approve/reject (UC-10)
```

### Logs
```
POST /api/logs                  # Submit log (UC-04)
GET  /api/logs/project/:id      # Get project logs
PATCH /api/logs/:id/sign        # Sign log (UC-11)
```

### Defenses
```
GET  /api/defenses              # Get defenses
PATCH /api/defenses/:id/evaluate  # Submit evaluation (UC-22)
```

### Notifications
```
GET  /api/notifications         # Get user notifications (UC-27)
PATCH /api/notifications/:id/read  # Mark as read
POST /api/notifications/mark-all-read  # Mark all as read
```

## 🎨 UI Components

Built with **Radix UI** and **Shadcn/ui** for:
- Buttons, Inputs, Select, Dialog
- Accordion, Alert, Tabs, Tooltips
- Charts (Recharts), Calendar, Progress
- Toast notifications (Sonner)

## 📝 SRS Compliance

This implementation follows **IEEE 830-1998** and **ISO/IEC/IEEE 29148:2018** standards as specified in the SRS document v4.0.

### Traceability Matrix

| Epic | Use Cases | Status |
|------|-----------|--------|
| Epic 1: Proposal Management | UC-02, UC-03, UC-09, UC-10, UC-31, UC-33 | ✅ Implemented |
| Epic 2: Progress Tracking | UC-04, UC-05, UC-06, UC-11, UC-12, UC-13 | ✅ Implemented |
| Epic 3: Defense Scheduling | UC-07, UC-15, UC-16, UC-17, UC-18 | 🚧 In Progress |
| Epic 4: Evaluation & Grading | UC-08, UC-21, UC-22, UC-23, UC-24 | ✅ Implemented |
| Epic 5: Analytics & Reporting | UC-14, UC-19, UC-20, UC-25, UC-27 | ✅ Implemented |
| Epic 6: Security & Access Control | UC-01, UC-26, UC-35-40 | ✅ Implemented |

## 🐛 Known Issues

- File upload not yet connected to cloud storage (AWS S3/Azure Blob)
- Email notifications stubbed (requires SMTP configuration)
- Defense auto-scheduler algorithm pending implementation
- Tablet-optimized evaluator UI needs refinement

## 🚀 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Configure MongoDB Atlas connection
3. Set strong JWT secret
4. Configure SendGrid/Mailgun for emails
5. Set up SSL certificates (HTTPS)
6. Configure CORS for production domain
7. Enable rate limiting
8. Set up automated backups (6-hour interval)

## 📞 Support

For issues or questions:
- Check SRS document (version 4.0)
- Review use case specifications (Section 3.2)
- Consult data dictionary (Section 7.2)

## 📄 License

&copy; 2025 Bahria University - Department of Computer Science

---

**Document Version:** 1.0  
**Last Updated:** December 1, 2025  
**SRS Reference:** v4.0 Final (November 30, 2025)
