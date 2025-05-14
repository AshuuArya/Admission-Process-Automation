# ABES College Admission Portal

A comprehensive MERN stack application for managing the admission process at ABES College.

## Features

- User authentication with JWT
- Student registration with email verification
- Application submission and tracking
- Document upload system
- Admin dashboard for application management
- Email notifications for status updates

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Formik, Yup
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, bcrypt
- **File Handling**: Multer
- **Notifications**: Nodemailer

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone the repository:
```
git clone <repository-url>
cd abes-admission-portal
```

2. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:5173
```

3. Install dependencies and start the application:
```
npm run setup
```
This will install all dependencies and start both the server and client.

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login a user
- `GET /api/auth/verify-email/:token` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Student Endpoints

- `POST /api/students/application` - Submit a new application
- `GET /api/students/application/:id` - Get application details
- `PUT /api/students/application/:id` - Update application
- `GET /api/students/applications` - Get all applications for a student

### Document Endpoints

- `POST /api/documents/upload` - Upload a document
- `GET /api/documents/:id` - Get document details
- `DELETE /api/documents/:id` - Delete a document

### Admin Endpoints

- `GET /api/admin/applications` - Get all applications
- `PUT /api/admin/applications/:id/status` - Update application status
- `GET /api/admin/students` - Get all students
- `GET /api/admin/analytics` - Get analytics data

## License

This project is licensed under the MIT License - see the LICENSE file for details.