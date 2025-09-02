#  Note Taking App

A full-stack note-taking application built with **React (TypeScript)** for the frontend and **Node.js (TypeScript)** for the backend.  
Users can **sign up / log in using Email OTP or Google**, securely manage their notes with **JWT authentication**, and enjoy a clean, mobile-friendly UI.

---

##  Features

-  Signup & Login using **Email + OTP**
-  Google Authentication via OAuth2
-  JWT-based Authentication & Authorization
-  Create and Delete Notes
-  Responsive UI (mobile-first design)
-  Robust error handling for invalid inputs & API failures
-  Deployment-ready (frontend + backend)

---

##  Tech Stack

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | React, TypeScript, TailwindCSS |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | MongoDB Atlas |
| **Auth** | JWT, Google OAuth2, Email OTP (Nodemailer) |
| **Deployment** | Vercel (frontend), Render/Railway (backend) |

---

##  Project Structure

```
note-taking-app/
│
├── frontend/         # React + TypeScript UI
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/          # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   └── ...
│
└── README.md
```

---

##  Setup Instructions

### 1️ Clone the Repository

```bash
git clone https://github.com/SagarKharat94440/note-taking-app.git
cd note-taking-app
```

### 2️ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Run backend:

```bash
npm run dev
```

### 3️ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at:  **http://localhost:5173**

---
##  Deployment

- **Frontend:** Deploy on Vercel
- **Backend:** Deploy on Render or Railway
- **Database:** MongoDB Atlas

> **Note:** Update API URLs in frontend `.env` to match your deployed backend.

---

##  Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Google Cloud Console** account (for OAuth2)
- **Gmail** account with App Password (for email OTP)

---

##  Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT tokens | `your_secret_key` |
| `EMAIL_USER` | Gmail address for OTP | `your_email@gmail.com` |
| `EMAIL_PASS` | Gmail App Password | `your_app_password` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your_google_client_id` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `your_google_client_secret` |

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000  # For development
# VITE_API_URL=https://your-backend-url.com  # For production
```

---

##  Authentication Flow

1. **Email OTP**: User enters email → receives OTP → verifies OTP → gets JWT token
2. **Google OAuth**: User clicks Google login → redirected to Google → callback with JWT token
3. **JWT Storage**: Token stored in localStorage for subsequent requests
4. **Protected Routes**: Notes operations require valid JWT token

---

##  API Endpoints

### Authentication
- `POST /api/auth/signup` - Sign up with email
- `POST /api/auth/verify-otp` - Verify OTP and get JWT
- `POST /api/auth/login` - Login with email
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `DELETE /api/notes/:id` - Delete note by ID

---




