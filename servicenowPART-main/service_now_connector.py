import requests
import os
from dotenv import load_dotenv


load_dotenv()

class ServiceNowConnector:
    def __init__(self):
        
        self.instance_url = os.getenv("SERVICENOW_INSTANCE_URL")
        self.username = os.getenv("SERVICENOW_USERNAME")
        self.password = os.getenv("SERVICENOW_PASSWORD")
        self.auth = (self.username, self.password)

    def fetch_tickets(self):
        url = f"{self.instance_url}/api/now/table/incident"
        headers = {"Accept": "application/json"}
        response = requests.get(url, headers=headers, auth=self.auth)
        if response.status_code == 200:
            return response.json().get("result", [])
        else:
            print(f"Failed to fetch tickets: {response.status_code}")
            return []
