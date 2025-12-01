# MongoDB Database Setup Guide

## Prerequisites
- MongoDB 5.0 or higher installed
- MongoDB Compass (optional, for GUI management)

## Option 1: Local MongoDB Installation

### Windows Installation
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the wizard
3. MongoDB will run as a Windows Service on port 27017 by default

### Start MongoDB Service
```powershell
# Check if MongoDB is running
Get-Service -Name MongoDB

# Start MongoDB service if not running
Start-Service -Name MongoDB
```

### Connection String
```
mongodb://localhost:27017/fyp_management
```

## Option 2: MongoDB Atlas (Cloud - Recommended)

### Setup Steps
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (Free tier M0 available)
4. Wait for cluster deployment (2-3 minutes)
5. Click "Connect" on your cluster
6. Add your IP address to whitelist (or use 0.0.0.0/0 for testing)
7. Create a database user with username/password
8. Copy the connection string

### Connection String Format
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fyp_management?retryWrites=true&w=majority
```

## Database Schema

The application will automatically create collections and indexes when the backend starts. The schema is already defined in the Mongoose models.

### Collections Overview

#### 1. **users**
Stores all system users (students, supervisors, coordinators, HOD, evaluators)

#### 2. **projects**
Stores FYP project proposals and details

#### 3. **logs**
Stores weekly progress logs (24 required per project)

#### 4. **defenses**
Stores defense schedules, panels, and evaluations

#### 5. **notifications**
Stores system notifications for all users

## Environment Configuration

### Backend `.env` File

Create `server/.env` with the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fyp_management
# OR for Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fyp_management?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRE=24h

# Email Configuration (SendGrid or Gmail)
EMAIL_FROM=noreply@bahriauniversity.edu.pk
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Security
BCRYPT_ROUNDS=10
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=15
```

## Complete Schema Reference

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  role: String (enum: student, supervisor, coordinator, evaluator, hod),
  department: String (required),
  isActive: Boolean (default: true),
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  loginAttempts: Number (default: 0),
  lockUntil: Date,
  lastLogin: Date,
  
  // Student-specific fields
  registrationNumber: String,
  semester: Number,
  cgpa: Number,
  
  // Supervisor-specific fields
  designation: String,
  maxProjects: Number (default: 4),
  currentProjects: Number (default: 0),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email`: unique
- `role`: 1
- `department`: 1
- `registrationNumber`: 1 (sparse)

---

### Project Schema
```javascript
{
  projectCode: String (unique, auto-generated: YYYY-DEPT-###),
  title: String (required),
  description: String (required),
  type: String (enum: individual, group),
  category: String (enum: research, development, hybrid),
  
  // Student Information
  students: [{
    studentId: ObjectId (ref: User),
    registrationNumber: String,
    name: String,
    email: String
  }],
  
  // Supervision
  supervisor: {
    supervisorId: ObjectId (ref: User),
    name: String,
    email: String,
    department: String
  },
  coSupervisor: {
    supervisorId: ObjectId (ref: User),
    name: String,
    email: String,
    department: String
  },
  
  // Project Details
  department: String (required),
  session: String,
  semester: Number,
  
  // Proposal Documents
  proposalDocument: {
    filename: String,
    path: String,
    uploadedAt: Date
  },
  srsDocument: {
    filename: String,
    path: String,
    uploadedAt: Date,
    approvalStatus: String (enum: pending, approved, rejected),
    approvedBy: ObjectId (ref: User),
    approvedAt: Date,
    comments: String
  },
  
  // Plagiarism
  plagiarismReport: {
    filename: String,
    path: String,
    score: Number,
    uploadedAt: Date,
    verifiedBy: ObjectId (ref: User),
    verifiedAt: Date
  },
  
  // Status & Phase
  status: String (enum: draft, submitted, under_review, approved, rejected, in_progress, completed),
  currentPhase: String (enum: proposal, development, pre_defense, post_defense, completed),
  
  // Approval Workflow
  coordinatorApproval: {
    status: String (enum: pending, approved, rejected),
    approvedBy: ObjectId (ref: User),
    approvedAt: Date,
    comments: String
  },
  hodApproval: {
    status: String (enum: pending, approved, rejected),
    approvedBy: ObjectId (ref: User),
    approvedAt: Date,
    comments: String
  },
  
  // Defense Eligibility
  isDefenseEligible: Boolean (default: false),
  defenseEligibilityCheckedAt: Date,
  
  // Metadata
  submittedAt: Date,
  approvedAt: Date,
  completedAt: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `projectCode`: unique
- `students.studentId`: 1
- `supervisor.supervisorId`: 1
- `department`: 1
- `status`: 1
- `currentPhase`: 1

---

### Log Schema
```javascript
{
  project: ObjectId (ref: Project, required),
  student: ObjectId (ref: User, required),
  logNumber: Number (required, 1-24),
  weekNumber: Number (required, 1-24),
  
  // Log Content
  title: String (required),
  description: String (required),
  tasksCompleted: [String],
  tasksPlanned: [String],
  challenges: String,
  hoursSpent: Number,
  
  // Attachments
  attachments: [{
    filename: String,
    path: String,
    uploadedAt: Date
  }],
  
  // Supervisor Feedback
  supervisorFeedback: {
    comment: String,
    rating: Number (1-5),
    reviewedBy: ObjectId (ref: User),
    reviewedAt: Date
  },
  
  // Digital Signature
  digitalSignature: {
    hash: String,
    signedAt: Date,
    signedBy: ObjectId (ref: User)
  },
  
  // Status
  status: String (enum: draft, submitted, reviewed, approved),
  submittedAt: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `project`: 1
- `student`: 1
- `logNumber`: 1
- `{ project: 1, logNumber: 1 }`: compound unique

---

### Defense Schema
```javascript
{
  project: ObjectId (ref: Project, required),
  defenseType: String (enum: pre_defense, final_defense),
  
  // Scheduling
  scheduledDate: Date (required),
  scheduledTime: String,
  venue: String,
  duration: Number (minutes, default: 60),
  
  // Panel Members
  panel: [{
    evaluatorId: ObjectId (ref: User),
    name: String,
    email: String,
    role: String (enum: chairperson, internal_examiner, external_examiner, supervisor)
  }],
  
  // Evaluation Criteria (each out of specified max points)
  evaluation: {
    technicalContent: {
      score: Number (max: 20),
      evaluatedBy: ObjectId (ref: User),
      comments: String
    },
    presentation: {
      score: Number (max: 40),
      evaluatedBy: ObjectId (ref: User),
      comments: String
    },
    qaSession: {
      score: Number (max: 20),
      evaluatedBy: ObjectId (ref: User),
      comments: String
    },
    documentation: {
      score: Number (max: 20),
      evaluatedBy: ObjectId (ref: User),
      comments: String
    }
  },
  
  // Scoring
  totalScore: Number (virtual, calculated),
  grade: String,
  result: String (enum: pass, fail, conditional_pass),
  
  // Status
  status: String (enum: scheduled, in_progress, completed, cancelled),
  
  // Feedback
  generalFeedback: String,
  recommendations: [String],
  
  // Completion
  completedAt: Date,
  completedBy: ObjectId (ref: User),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `project`: 1
- `scheduledDate`: 1
- `status`: 1
- `panel.evaluatorId`: 1

---

### Notification Schema
```javascript
{
  recipient: ObjectId (ref: User, required),
  type: String (enum: info, warning, success, error),
  category: String (enum: project, defense, log, system, approval),
  
  // Content
  title: String (required),
  message: String (required),
  actionUrl: String,
  
  // Related Entities
  relatedProject: ObjectId (ref: Project),
  relatedDefense: ObjectId (ref: Defense),
  relatedLog: ObjectId (ref: Log),
  
  // Status
  isRead: Boolean (default: false),
  readAt: Date,
  
  // Priority
  priority: String (enum: low, normal, high, urgent),
  
  // Email Notification
  emailSent: Boolean (default: false),
  emailSentAt: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `recipient`: 1
- `isRead`: 1
- `createdAt`: -1 (descending)
- `{ recipient: 1, isRead: 1 }`: compound

---

## Database Initialization

### 1. Install Backend Dependencies
```powershell
cd server
npm install
```

### 2. Create .env File
```powershell
# Create the .env file in server directory
New-Item -Path "server\.env" -ItemType File -Force
```

Then edit `server/.env` with your MongoDB connection string and other settings.

### 3. Start Backend Server
```powershell
cd server
npm start
```

The server will:
- Connect to MongoDB
- Create collections automatically
- Set up all indexes
- Be ready to accept requests on http://localhost:5000

### 4. Verify Connection
Check the console output for:
```
✓ MongoDB Connected: <your-connection-details>
✓ Server running on port 5000
```

## Seed Sample Data (Optional)

You can create a seed script to populate initial data. Create `server/seed.js`:

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - be careful in production!)
    // await User.deleteMany({});

    const users = [
      {
        name: 'Test Student',
        email: 'student@bu.edu.pk',
        password: await bcrypt.hash('Student123!', 10),
        role: 'student',
        department: 'CS',
        registrationNumber: '01-111-191-001',
        semester: 8,
        cgpa: 3.5,
        isEmailVerified: true,
        isActive: true
      },
      {
        name: 'Dr. John Supervisor',
        email: 'supervisor@bu.edu.pk',
        password: await bcrypt.hash('Super123!', 10),
        role: 'supervisor',
        department: 'CS',
        designation: 'Assistant Professor',
        maxProjects: 4,
        isEmailVerified: true,
        isActive: true
      },
      {
        name: 'Dr. Coordinator',
        email: 'coordinator@bu.edu.pk',
        password: await bcrypt.hash('Coord123!', 10),
        role: 'coordinator',
        department: 'CS',
        designation: 'Associate Professor',
        isEmailVerified: true,
        isActive: true
      },
      {
        name: 'Dr. HOD',
        email: 'hod@bu.edu.pk',
        password: await bcrypt.hash('Hod123!', 10),
        role: 'hod',
        department: 'CS',
        designation: 'Professor',
        isEmailVerified: true,
        isActive: true
      },
      {
        name: 'Dr. External Evaluator',
        email: 'evaluator@bu.edu.pk',
        password: await bcrypt.hash('Eval123!', 10),
        role: 'evaluator',
        department: 'CS',
        designation: 'Professor',
        isEmailVerified: true,
        isActive: true
      }
    ];

    await User.insertMany(users);
    console.log('✓ Sample users created successfully');
    console.log('\nLogin Credentials:');
    console.log('Student: student@bu.edu.pk / Student123!');
    console.log('Supervisor: supervisor@bu.edu.pk / Super123!');
    console.log('Coordinator: coordinator@bu.edu.pk / Coord123!');
    console.log('HOD: hod@bu.edu.pk / Hod123!');
    console.log('Evaluator: evaluator@bu.edu.pk / Eval123!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();
```

Run the seed script:
```powershell
node server/seed.js
```

## Troubleshooting

### Cannot connect to MongoDB
- Check if MongoDB service is running: `Get-Service -Name MongoDB`
- Verify connection string in `.env` file
- For Atlas: Check IP whitelist and credentials

### Collections not created
- Collections are created automatically when first document is inserted
- Run the seed script or use the registration API

### Authentication errors
- Verify JWT_SECRET is set in `.env`
- Check password meets requirements (min 8 chars, uppercase, lowercase, number)

### Index errors
- Drop and recreate indexes: Connect via MongoDB Compass
- Or use: `db.collection.dropIndexes()` in MongoDB shell

## MongoDB Compass (GUI Tool)

1. Download from: https://www.mongodb.com/try/download/compass
2. Connect using your connection string
3. View and manage collections, documents, and indexes visually

## Next Steps

After database setup:
1. Start backend: `cd server && npm start`
2. Start frontend: `npm run dev`
3. Register users or run seed script
4. Login and test the system
