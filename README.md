# Policy Management & Approval System

A complete Policy Management System built using Frappe Framework (Python) for the backend and React.js for the frontend. This system enables creation, management, approval, and tracking of company policies with a modern UI and a structured backend.

## Project Layout

```
backend/
  README.md
  policy_management/        # Frappe app containing DocTypes and API
frappe-bench/
│
├── config/       # Bench and supervisor configurations
├── env/          # Python virtual environment
├── logs/         # Log files for bench, workers, redis, schedule, etc.
├── sites/        # Frappe sites, site config, database config
├── Procfile      # Process definitions for running bench
└── patches.txt   # Frappe patches tracking file

frontend/
  package.json
  src/                      # React app with modular pages/components
```

## Backend (Frappe)
- DocTypes for `Policy`, `Policy Request`, and `Policy Activity Log`
- Whitelisted API methods: `get_active_policies`, `create_policy_request`, `review_request`, `get_policy_request_list`, `get_activity_logs`
- Automatic activity logging via Doc Event hooks
- Scheduled job stub for pending approvals digest
- Permission helpers for Employee, Policy Manager, and Admin roles

See `backend/README.md` for setup instructions.

## Frontend (React + Vite)
- Vite + React + TypeScript + TanStack Query
- Hook-based data fetching and form handling
- Pages: Login, Policies, Policy Detail, Requests, Review, Activity Log
- Axios API client wrapper with global error interception
- Basic responsive styling with CSS grid/flex

### Running Frontend
```bash
cd frontend
npm run dev
```

Configure `VITE_API_BASE` to point to your Frappe site (defaults to `/api/method/policy_management.api`).

## Next Steps
- Wire authentication to Frappe session/login API
- Add slack/email integration for notifications
- Expand unit tests for DocTypes and React components

=======
# policy_management_system

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
<img width="1469" height="742" alt="image" src="https://github.com/user-attachments/assets/aaee3a04-20cf-4c77-8b4f-f1fdefdb9380" />
<img width="1549" height="1033" alt="image" src="https://github.com/user-attachments/assets/14d71860-28f9-4adb-8a3e-646c1f920950" />
<img width="1286" height="857" alt="image" src="https://github.com/user-attachments/assets/1cd61529-cae7-4db5-bfa5-02c7bd41199f" />






