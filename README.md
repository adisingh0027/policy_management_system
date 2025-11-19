# Policy Management & Approval System

Full-stack reference implementation with a Frappe backend and React + TypeScript frontend.

## Project Layout

```
backend/
  README.md
  policy_management/        # Frappe app containing DocTypes and API
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



