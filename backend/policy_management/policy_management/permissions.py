"""Role based permission helpers for Policy Management"""

from __future__ import annotations

import frappe

EMPLOYEE_ROLE = "Employee"
POLICY_MANAGER_ROLE = "Policy Manager"
ADMIN_ROLE = "System Manager"


class PermissionError(frappe.PermissionError):
    """Custom permission error to bubble up to API layer"""


def assert_roles(*allowed_roles: str) -> None:
    """Ensure the current user has one of the allowed roles."""

    user = frappe.session.user
    roles = set(frappe.get_roles(user))
    if not roles.intersection(allowed_roles):
        raise PermissionError(
            f"User {user} does not have permission. Required roles: {allowed_roles}"
        )


def is_policy_manager(user: str | None = None) -> bool:
    candidate = user or frappe.session.user
    return POLICY_MANAGER_ROLE in frappe.get_roles(candidate)


def is_employee(user: str | None = None) -> bool:
    candidate = user or frappe.session.user
    return EMPLOYEE_ROLE in frappe.get_roles(candidate)
