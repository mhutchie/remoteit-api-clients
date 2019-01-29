import json
import requests
import time


class RemoteItApiClient:
    def __init__(self, username, password, developer_key):
        self._username = username
        self._password = password
        self._developer_key = developer_key
        self._token = ""
        self._token_expiration = 0
        self._user_agent = "RemoteIt-API-Client-PY"

    def list_devices(self):
        response = requests.get("https://api.remot3.it/apv/v27/device/list/all", headers=self._get_api_headers())
        response_body = response.json()
        if response.status_code == 200:
            return response_body.get("devices")
        else:
            raise RemoteItApiError(response_body)

    def get_connection_to_device(self, device_address, wait=True, hostip=None):
        request_data = {
            "deviceaddress": device_address,
            "wait": wait
        }
        if hostip:
            request_data["hostip"] = hostip

        response = requests.post("https://api.remot3.it/apv/v27/device/connect",
                                 data=json.dumps(request_data), headers=self._get_api_headers())

        response_body = response.json()
        if response.status_code == 200:
            return response_body.get("connection")
        else:
            raise RemoteItApiError(response_body)

    def _get_auth_token(self):
        if self._token_expiration > time.time():
            return self._token

        headers = {
            "developerkey": self._developer_key,
            "User-Agent": self._user_agent
        }
        request_data = {
            "username": self._username,
            "password": self._password
        }
        response = requests.post("https://api.remot3.it/apv/v27/user/login",
                                 data=json.dumps(request_data), headers=headers)
        response_body = response.json()

        if response.status_code == 200:
            self._token = response_body.get("auth_token")
            self._token_expiration = response_body.get("auth_expiration")
            return self._token
        else:
            raise RemoteItApiError(response_body)

    def _get_api_headers(self):
        return {
            "developerkey": self._developer_key,
            "token": self._get_auth_token(),
            "User-Agent": self._user_agent
        }


class RemoteItApiError(Exception):
    def __init__(self, error):
        super(RemoteItApiError, self).__init__(error.get("reason"))
