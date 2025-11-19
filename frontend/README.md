 Policy Management System

A complete Policy Management System built using Frappe Framework (Python) for the backend and React.js for the frontend. This system enables creation, management, approval, and tracking of company policies with a modern UI and a structured backend.

Features
🔹 Backend (Frappe Framework)

Custom Doctypes for policies, users, access control, and workflow

REST API endpoints using api.py

Business logic and server scripts via Frappe hooks

Role-based permissions via permissions.py

Configurable modules inside policy_management/config

🔹 Frontend (React.js)

Modern and responsive UI

API integration with Frappe backend

Component-based architecture

Authentication & Authorization handling

Policy creation, editing, approval UI

🔹 Deployment

Uses Procfile for deployment (Heroku or similar)

Frontend served separately or via Nginx

Backend served through Frappe bench

## Tech Stack

- Vite + React + TypeScript
- TanStack Query for server state
- React Hook Form for lightweight forms
- Axios API client wrapper

## Architecture
- `src/router.tsx` defines protected routes for login, policies, requests, review, and activity log.
- `src/context` hosts `AuthProvider` and `NotificationProvider`, making auth state and toast messaging available app-wide.
- `src/hooks` wraps TanStack Query to keep components declarative.
- `src/api` centralizes REST calls against the Frappe backend (`/api/method/policy_management.api` namespace).
- `src/components` contains small presentational building blocks such as policy cards, status tags, layouts, etc.
- `src/pages` compose hooks + components into the required screens.

## Running Locally
```bash
npm install
npm run dev
```

Policy-Management-System
│
├── backend/
│   ├── policy_management/
│   │   ├── config/
│   │   │   └── ...
│   │   ├── doctype/
│   │   │   └── ... (Custom doctypes)
│   │   ├── utils/
│   │   │   └── ...
│   │   ├── api.py          # API endpoints
│   │   ├── hooks.py        # Frappe hooks
│   │   ├── permissions.py  # RBAC logic
│   │   └── __init__.py
│   ├── README.md
│   └── requirements.txt    # Python dependencies
│
├── frappe-bench/
│   ├── apps/
│   ├── config/
│   ├── env/
│   ├── logs/
│   ├── sites/
│   ├── patches.txt
│   └── Procfile
│
└── frontend/
    ├── src/
    │   └── ... React components
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── eslint.config.js


