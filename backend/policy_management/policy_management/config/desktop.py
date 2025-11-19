app_name = "policy_management"

def get_data():
    return [
        {
            "label": "Policies",
            "items": [
                {
                    "type": "doctype",
                    "name": "Policy",
                    "label": "Policies",
                    "description": "Company policy documents",
                },
                {
                    "type": "doctype",
                    "name": "Policy Request",
                    "label": "Policy Requests",
                    "description": "Employee policy clarifications",
                },
            ],
        }
    ]

