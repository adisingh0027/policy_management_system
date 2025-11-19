from __future__ import annotations

import frappe
from frappe.model.document import Document

from policy_management.policy_management import permissions

TERMINAL_STATUSES = {"Approved", "Rejected"}


class PolicyRequest(Document):
    def before_insert(self):
        if not self.employee:
            self.employee = frappe.session.user

    def validate(self):
        self._ensure_employee_is_owner()
        self._ensure_status_flow()

    def _ensure_employee_is_owner(self):
        if self.owner != self.employee and not permissions.is_policy_manager():
            frappe.throw("Employees can only file requests for themselves.")

    def _ensure_status_flow(self):
        previous = self.get_db_value("status")
        if not previous:
            return
        if previous in TERMINAL_STATUSES and self.status != previous:
            frappe.throw("Cannot change status after approval or rejection.")

