from __future__ import annotations

import frappe
from frappe.model.document import Document


class Policy(Document):
    def validate(self):
        self._validate_version()
        self._ensure_unique_active_version()

    def _validate_version(self) -> None:
        if self.version < 1:
            frappe.throw(\"Version must be >= 1\")

    def _ensure_unique_active_version(self) -> None:
        if not self.is_active:
            return
        filters = {
            \"name\": (\"!=\", self.name),
            \"category\": self.category,
            \"is_active\": 1,
        }
        if frappe.db.exists(\"Policy\", filters):
            frappe.throw(\"Only one active policy per category is allowed.\")

