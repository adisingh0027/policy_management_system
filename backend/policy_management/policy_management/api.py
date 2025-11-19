from __future__ import annotations

from datetime import datetime
from typing import Literal

import frappe
from frappe import _  # noqa: F401

from policy_management.policy_management import permissions


def _serialize_policy(doc) -> dict:
    return {
        "name": doc.name,
        "title": doc.title,
        "description": doc.description,
        "category": doc.category,
        "version": doc.version,
        "active_from": doc.active_from,
        "is_active": doc.is_active,
        "attachment": doc.attachment,
    }


def _serialize_request(doc) -> dict:
    return {
        "name": doc.name,
        "policy": doc.policy,
        "employee": doc.employee,
        "query": doc.query,
        "status": doc.status,
        "approver": doc.approver,
        "approver_remarks": doc.approver_remarks,
        "modified": doc.modified,
    }


@frappe.whitelist()
def get_active_policies(category: str | None = None) -> list[dict]:
    filters = {"is_active": 1}
    if category:
        filters["category"] = category
    policies = frappe.get_all(
        "Policy",
        fields=["name", "title", "category", "version", "active_from", "attachment"],
        filters=filters,
        order_by="category asc, version desc",
    )
    return policies


@frappe.whitelist()
def create_policy_request(policy: str, query: str) -> dict:
    permissions.assert_roles(permissions.EMPLOYEE_ROLE, permissions.POLICY_MANAGER_ROLE)
    doc = frappe.get_doc(
        {
            "doctype": "Policy Request",
            "policy": policy,
            "query": query,
            "employee": frappe.session.user,
        }
    )
    doc.insert()
    return _serialize_request(doc)


@frappe.whitelist()
def review_request(
    request_id: str,
    status: Literal["Under Review", "Approved", "Rejected"],
    remarks: str | None = None,
) -> dict:
    permissions.assert_roles(permissions.POLICY_MANAGER_ROLE, permissions.ADMIN_ROLE)
    doc = frappe.get_doc("Policy Request", request_id)
    doc.status = status
    doc.approver = frappe.session.user
    doc.approver_remarks = remarks
    doc.save()
    _notify_employee(doc)
    return _serialize_request(doc)


@frappe.whitelist()
def get_policy_request_list(status: str | None = None) -> list[dict]:
    filters = {}
    if status:
        filters["status"] = status
    if permissions.is_employee() and not permissions.is_policy_manager():
        filters["employee"] = frappe.session.user
    docs = frappe.get_list(
        "Policy Request",
        fields=[
            "name",
            "policy",
            "employee",
            "status",
            "approver",
            "approver_remarks",
            "modified",
        ],
        filters=filters,
        order_by="modified desc",
    )
    return docs


@frappe.whitelist()
def get_activity_logs(reference_name: str | None = None) -> list[dict]:
    filters = {}
    if reference_name:
        filters["reference_name"] = reference_name
    return frappe.get_list(
        "Policy Activity Log",
        fields=[
            "name",
            "reference_type",
            "reference_name",
            "event_type",
            "details",
            "changed_by",
            "modified",
        ],
        filters=filters,
        order_by="modified desc",
    )


def _notify_employee(doc):
    # Placeholder for Slack/email notification integration
    frappe.logger().info("Notification pending for %s", doc.employee)


def _pending_requests():
    return frappe.get_all(
        "Policy Request",
        fields=["name", "employee", "policy", "status", "modified"],
        filters={"status": ("in", ["Open", "Under Review"])},
    )


def send_pending_approval_digest():
    permissions.assert_roles(permissions.POLICY_MANAGER_ROLE, permissions.ADMIN_ROLE)
    digest = _pending_requests()
    if not digest:
        return
    message = \"\\n\".join(
        f\"{row.name} for policy {row.policy} ({row.status}) updated {row.modified}\"
        for row in digest
    )
    frappe.logger().info(\"Pending approvals digest:\\n%s\", message)
    # enqueue email/slack notifications here
    return {\"generated_on\": datetime.utcnow(), \"count\": len(digest)}

