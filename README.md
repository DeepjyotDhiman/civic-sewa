🏛️ Civic Sewa – Smart Civic Issue Management Portal

Civic Sewa is a modern civic engagement web application that allows citizens to report civic issues and emergencies, while authorities can monitor and manage reported cases through a dedicated administrative panel.

This project is currently frontend-only, built for scalability, clarity, and future backend integration.

🚀 Features
👤 Citizen Portal

Report civic issues (roads, sanitation, utilities, etc.)

Report emergencies (floods, fires, accidents)

View personal dashboard

Modern, responsive UI

Role-based access control

🏢 Authority Portal

Dedicated authority dashboard

View all reported issues

Manage issues via modal interface (UI-only)

Secure role-based routing

Sidebar-based admin layout

🎨 UI & UX

Tailwind CSS for styling

Framer Motion animations

Fully responsive design

Clean gov-tech inspired interface

🛠️ Tech Stack

React (Vite)

React Router v6

Tailwind CSS

Framer Motion

React Icons

❌ No backend
❌ No Firebase
❌ No database (yet)

📂 Project Structure
src/
├── authority/
│   ├── AuthorityLayout.jsx
│   ├── AuthorityDashboard.jsx
│   ├── AllIssuesPage.jsx
│   └── IssueModal.jsx
│
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ReportIssuePage.jsx
│   ├── EmergencyReportPage.jsx
│   ├── AboutPage.jsx
│   ├── ServicesPage.jsx
│   └── FeedbackPage.jsx
│
├── App.jsx
└── main.jsx

🔐 Authentication & Routing

Authentication is currently mocked using localStorage.

Roles

citizen

authority

Example (Login simulation)
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("role", "authority");


Routing is protected using a custom ProtectedRoute component.

▶️ Running the Project
1️⃣ Install dependencies
npm install

2️⃣ Start development server
npm run dev

3️⃣ Open in browser
http://localhost:5173

🧪 Testing Authority Panel

Login as authority (mock)

Navigate to:

/authority/dashboard


Use sidebar to access:

Dashboard

All Issues

🔄 Current Limitations

No backend / API

No persistent database

Authority actions are UI-only

Data resets on refresh

🔮 Future Enhancements

Backend integration (Firebase / REST API)

Real-time issue tracking

Authority status updates reflected to citizens

Notifications system

Analytics dashboard

Role-based permissions

Deployment (Vercel / Netlify)

📌 Project Goal

This project is designed as a scalable civic-tech foundation suitable for:

Academic projects

Hackathons

MVP demos

Government-tech prototypes

📄 License

This project is for educational and demonstration purposes.