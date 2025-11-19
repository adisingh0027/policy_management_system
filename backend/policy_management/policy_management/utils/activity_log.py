from __future__ import annotations

import frappe

EVENT_CREATED = "Created"
EVENT_UPDATED = "Updated"
EVENT_STATUS_CHANGED = "Status Changed"
EVENT_COMMENT_ADDED = "Comment Added"


def _insert_log(**kwargs):
    doc = frappe.get_doc({"doctype": "Policy Activity Log", **kwargs})
    doc.insert(ignore_permissions=True)


def log_policy_created(doc, method=None):
    _insert_log(
        reference_type="Policy",
        reference_name=doc.name,
        event_type=EVENT_CREATED,
        changed_by=doc.owner,
        details=f"Policy {doc.title} created",
    )


def log_policy_updated(doc, method=None):
    _insert_log(
        reference_type="Policy",
        reference_name=doc.name,
        event_type=EVENT_UPDATED,
        changed_by=frappe.session.user,
        details=f"Policy {doc.title} updated",
    )


def log_request_created(doc, method=None):
    _insert_log(
        reference_type="Policy Request",
        reference_name=doc.name,
        event_type=EVENT_CREATED,
        changed_by=doc.owner,
        details=f"Request created for policy {doc.policy}",
    )


def log_request_updated(doc, method=None):
    event = EVENT_STATUS_CHANGED if doc.has_value_changed("status") else EVENT_UPDATED
    _insert_log(
        reference_type="Policy Request",
        reference_name=doc.name,
        event_type=event,
        changed_by=frappe.session.user,
        details=f"Request status is {doc.status}",
    )
