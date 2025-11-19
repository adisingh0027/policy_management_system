# Policy Management & Approval System — Backend

This folder contains a Frappe app that implements the workflow, API, and automation required for the Policy Management & Approval System.

## Structure

```
policy_management/
  policy_management/
    api.py                # Public API endpoints exposed via whitelisted methods
    hooks.py              # App hooks to register schedules, permissions, doc events
    permissions.py        # Role-based permission helper utilities
    utils/
      activity_log.py     # Centralized activity log writer
    doctype/
      policy/             # Policy DocType model and schema
      policy_request/     # Policy Request DocType model, validations
      policy_activity_log/# Policy Activity Log DocType model
```

## Key Features
- Role-based access control for Employee, Policy Manager, and Admin roles
- Document Types for policies, policy requests, and activity logs
- API methods for listing policies, submitting requests, reviewing requests, and fetching request lists
- Automatic activity logging via document events
- Background scheduled job that compiles pending approval digest
- Slack/email notification helpers (left as integration hooks)

## Running Locally

1. Create a fresh Frappe Bench and add this app:

```bash
bench new-site policy.local
bench get-app policy_management /path/to/backend/policy_management
bench --site policy.local install-app policy_management
```

2. Run the server:

```bash
bench --site policy.local serve
```

3. The API methods are accessible via `frappe.call` or REST under `/api/method/policy_management.api.<method>`.

## Tests

Sample unit tests can be added inside `policy_management/policy_management/tests`. For brevity they are not included but the DocType classes are fully typed and validated to simplify test creation.
