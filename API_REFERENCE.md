# FYP Management System - API Quick Reference

Base URL: `http://localhost:5000/api`

## Authentication Required

All endpoints except `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/auth/verify-email` require JWT token in header:

```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register Account (UC-01)
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Ahmed Ali",
  "email": "ahmed.ali@bu.edu.pk",
  "password": "Test1234",
  "role": "student",
  "studentId": "21-123-456"  // Required for students only
}

Response 201:
{
  "success": true,
  "message": "Account created. Check email to verify.",
  "data": {
    "userId": "...",
    "email": "ahmed.ali@bu.edu.pk",
    "role": "student"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "ahmed.ali@bu.edu.pk",
  "password": "Test1234"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Ahmed Ali",
      "email": "ahmed.ali@bu.edu.pk",
      "role": "student",
      "studentId": "21-123-456"
    }
  }
}
```

### Verify Email
```http
GET /auth/verify-email/:token

Response 200:
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "ahmed.ali@bu.edu.pk"
}

Response 200:
{
  "success": true,
  "message": "If account exists, reset link will be sent"
}
```

### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "NewPass1234"
}

Response 200:
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## 👤 User Endpoints

### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Ahmed Ali",
    "email": "ahmed.ali@bu.edu.pk",
    "role": "student",
    "studentId": "21-123-456",
    "isVerified": true,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### Get Supervisors
```http
GET /users/supervisors
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Dr. Sara Khan",
      "email": "sara.khan@bu.edu.pk",
      "domains": ["AI", "Machine Learning"],
      "currentLoad": "3/5",
      "isAvailable": true
    }
  ]
}
```

### Change Password (UC-36)
```http
PUT /users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "Test1234",
  "newPassword": "NewPass1234"
}

Response 200:
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## 📝 Project Endpoints

### Submit Proposal (UC-02)
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "AI Chatbot for Customer Support",
  "abstract": "This project aims to develop an intelligent chatbot using natural language processing to handle customer queries efficiently...",
  "domain": "AI",
  "supervisorId": "supervisor-id-here",
  "groupMembers": ["student-id-1", "student-id-2"]  // Optional, max 2
}

Response 201:
{
  "success": true,
  "message": "Proposal submitted successfully",
  "data": {
    "projectCode": "2025-CS-001",
    "title": "AI Chatbot for Customer Support",
    "proposalStatus": "submitted",
    "currentPhase": "proposal",
    ...
  }
}
```

### Get Projects
```http
GET /projects
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "projectCode": "2025-CS-001",
      "title": "AI Chatbot for Customer Support",
      "domain": "AI",
      "proposalStatus": "approved",
      "currentPhase": "srs",
      "logCount": 5,
      "supervisorId": { "name": "Dr. Sara Khan", ... },
      "studentIds": [{ "name": "Ahmed Ali", ... }],
      ...
    }
  ]
}
```

### Approve/Reject Proposal (UC-10)
```http
PATCH /projects/:projectId/proposal-decision
Authorization: Bearer <token>
Content-Type: application/json

{
  "decision": "approve",  // or "reject" or "revise"
  "feedback": "Great proposal! Approved."  // Required for reject/revise
}

Response 200:
{
  "success": true,
  "message": "Proposal approved successfully",
  "data": {
    "proposalStatus": "approved",
    "proposalSignature": "abc123...",
    "currentPhase": "srs",
    ...
  }
}
```

---

## 📋 Log Endpoints

### Submit Weekly Log (UC-04)
```http
POST /logs
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project-id-here",
  "tasksCompleted": "Implemented user authentication module, designed database schema, created API endpoints for login and registration",
  "nextWeekPlan": "Implement proposal submission form, add file upload functionality, integrate with backend API",
  "meetingDuration": 60,
  "discussionPoints": "Discussed progress on authentication, planned next sprint tasks",
  "weekStartDate": "2025-01-01"
}

Response 201:
{
  "success": true,
  "message": "Log submitted successfully",
  "data": {
    "logNumber": 1,
    "status": "pending",
    "studentSubmittedAt": "2025-01-01T10:00:00.000Z",
    ...
  }
}
```

### Get Project Logs
```http
GET /logs/project/:projectId
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "logNumber": 1,
      "tasksCompleted": "...",
      "status": "signed",
      "supervisorSignedAt": "2025-01-02T10:00:00.000Z",
      ...
    }
  ]
}
```

### Sign Log (UC-11)
```http
PATCH /logs/:logId/sign
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "Log signed successfully",
  "data": {
    "status": "signed",
    "supervisorSignature": "def456...",
    "supervisorSignedAt": "2025-01-02T10:00:00.000Z",
    ...
  }
}
```

---

## 🎓 Defense Endpoints

### Get Defenses
```http
GET /defenses
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "projectId": { "title": "AI Chatbot", ... },
      "defenseType": "final",
      "scheduledDate": "2025-05-15T10:00:00.000Z",
      "room": "H-101",
      "supervisorId": { "name": "Dr. Sara Khan" },
      "internalEvaluatorId": { "name": "Dr. Ahmed" },
      "externalEvaluatorId": { "name": "Mr. Ali" },
      "status": "scheduled",
      ...
    }
  ]
}
```

### Submit Evaluation (UC-22)
```http
PATCH /defenses/:defenseId/evaluate
Authorization: Bearer <token>
Content-Type: application/json

{
  "presentationScore": 18,
  "demoScore": 35,
  "qaScore": 17,
  "reportScore": 19,
  "remarks": "Excellent presentation and demo. Good technical depth."
}

Response 200:
{
  "success": true,
  "message": "Evaluation submitted successfully",
  "data": {
    "supervisorEvaluation": {
      "presentationScore": 18,
      "demoScore": 35,
      "qaScore": 17,
      "reportScore": 19,
      "totalScore": 89,
      "remarks": "...",
      "submittedAt": "2025-05-15T12:00:00.000Z"
    },
    "aggregatedScore": 87.5,  // If all evaluations submitted
    ...
  }
}
```

---

## 🔔 Notification Endpoints

### Get Notifications (UC-27)
```http
GET /notifications?isRead=false&type=approval&limit=50
Authorization: Bearer <token>

Query Parameters:
- isRead: true/false (optional)
- type: approval/reminder/compliance/alert/info (optional)
- limit: number (default: 50)

Response 200:
{
  "success": true,
  "data": [
    {
      "type": "approval",
      "title": "Proposal Approved!",
      "message": "Your project proposal has been approved",
      "isRead": false,
      "priority": "high",
      "createdAt": "2025-01-01T10:00:00.000Z",
      ...
    }
  ],
  "unreadCount": 5
}
```

### Mark as Read
```http
PATCH /notifications/:notificationId/read
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "isRead": true,
    "readAt": "2025-01-01T11:00:00.000Z",
    ...
  }
}
```

### Mark All as Read
```http
POST /notifications/mark-all-read
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 🏥 System Health

### Health Check
```http
GET /health

Response 200:
{
  "status": "OK",
  "timestamp": "2025-01-01T10:00:00.000Z",
  "uptime": 3600.5,
  "environment": "development"
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Please use university email (@bu.edu.pk)"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Required role: supervisor"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Project not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "An account with this email already exists"
}
```

### 423 Locked
```json
{
  "success": false,
  "message": "Account locked due to too many failed login attempts. Try again in 30 minutes."
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📌 Notes

1. **Token Expiration:** JWT tokens expire after 24 hours. Client should handle 401 errors and redirect to login.

2. **Rate Limiting:** Max 100 requests per minute per IP address.

3. **File Uploads:** (To be implemented) Will use `multipart/form-data` instead of JSON.

4. **Timestamps:** All timestamps are in ISO 8601 format (UTC).

5. **Pagination:** (To be implemented) Will support `?page=1&limit=20` query parameters.

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Ali",
    "email": "ahmed.ali@bu.edu.pk",
    "password": "Test1234",
    "role": "student",
    "studentId": "21-123-456"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed.ali@bu.edu.pk",
    "password": "Test1234"
  }'
```

### Get Projects (with token)
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Last Updated:** December 1, 2025  
**API Version:** 1.0  
**SRS Reference:** v4.0 Final
