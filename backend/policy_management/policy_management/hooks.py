app_name = "policy_management"
app_title = "Policy Management"
app_publisher = "Internal"
app_description = "Workflow-driven policy management and approval app"
app_email = "it@example.com"
app_license = "MIT"

# Role Home Pages
role_home_page = {
    "Policy Manager": "policy-dashboard",
    "Employee": "policies",
}

# Document Event Hooks

doc_events = {
    "Policy": {
        "after_insert": "policy_management.policy_management.utils.activity_log.log_policy_created",
        "on_update": "policy_management.policy_management.utils.activity_log.log_policy_updated",
    },
    "Policy Request": {
        "after_insert": "policy_management.policy_management.utils.activity_log.log_request_created",
        "on_update": "policy_management.policy_management.utils.activity_log.log_request_updated",
    },
}

# Scheduled Jobs
scheduler_events = {
    "daily": ["policy_management.policy_management.api.send_pending_approval_digest"],
}

def get_desktop_icons(data):
    return data
