# Python client for remote.it API Integration

This is an API client for integrating with the remote.it API's in Python.

### Table of Contents
- [RemoteItApiClient Documentation:](#remoteitapiclient-documentation)
	- Class: RemoteItApiClient
        - [RemoteItApiClient(username, password, developer_key)](#remoteitapiclientusername-password-developer_key)
		- [client.list_devices()](#clientlist_devices)
		- [client.get_connection_to_device(device_address, \[wait, hostip\])](#clientget_connection_to_devicedevice_address-wait-hostip)
    - Dependency: [requests](https://pypi.org/project/requests/)
- [Download & Install](#download--install)
- [Usage Examples:](#usage-examples)
	- [Listing Devices](#listing-devices)
	- [Get Connection to a Device](#get-connection-to-a-device)

### RemoteItApiClient Documentation

#### RemoteItApiClient(username, password, developer_key)
- Create an instance of the RemoteItApiClient class
- Arguments:
	- username: your remote.it email (or for legacy users, your username)
	- password: your remote.it password
    - developer_key: your remote.it developer key ([you can get it here](https://app.remote.it/account.html "you can get it here"))

#### client.list_devices()
- List all of your remote.it devices
- Output: A list of devices

#### client.get_connection_to_device(device_address, [wait, hostip])
- Get a connection to a remote.it device
- Arguments:
	- device_address: The service address of the device you'd like to connect to
	- wait: (Optional) Whether to wait for the connection or not
	- hostip: (Optional) The clients public IP address, which is used to enforce "IP restriction" upon making the connection. Defaults to the IP address of the the API caller if not provided.
- Output: A dictionary containing connection details.

### Download & Install
1. Download the directory [remoteit](remoteit)
2. Save the downloaded remoteit directory into a directory in your [Module Search Path](https://docs.python.org/2/tutorial/modules.html#the-module-search-path).
3. Import the module into your code by: `from remoteit import RemoteItApiClient`

### Usage Examples

#### Listing Devices
This example lists all of your remote.it devices. [Source code](examples/list-devices.py)
```python
from remoteit import RemoteItApiClient

client = RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>")

print(client.list_devices())
```
Output:
```python
[
    {
        'createdate': '2019-01-27T00:08:37.213-05:00',
        'deviceaddress': '80:00:00:00:01:00:01:25',
        'devicealias': 'Example-Device',
        'devicetype': '00:1E:00:00:00:01:00:00:04:60:00:50:00:01:00:00',
        'devicestate': 'active',
        'devicelastip': '126.237.116.49',
        'georegion': 'Asia',
        'lastcontacted': '2019-01-28T17:57:49.467-05:00',
        'lastinternalip': '10.61.12.80',
        'localurl': 'bm9uZQ==',
        'ownerusername': 'test@example.com',
        'servicetitle': 'Bulk Service',
        'shared': 'not-shared',
        'webenabled': '1',
        'weburi': [ None ],
        'webviewerurl': [ None ]
    }
]
```

#### Get Connection to a Device
This example gets a connection to a remote.it device. [Source code](examples/get-connection-to-device.py)
```python
from remoteit import RemoteItApiClient

client = RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>")

print(client.get_connection_to_device("<remote.it device address>"))
```
Output:
```python
{
    'deviceaddress': '80:00:00:00:00:00:00:F1',
    'expirationsec': '16880',
    'imageintervalms': '1000',
    'proxy': 'http://proxy71.rt3.io:38688',
    'proxyport': '38688',
    'proxyserver': 'proxy71.rt3.io',
    'requested': '1/28/2019T6:40 PM',
    'status': 'http://proxy71.rt3.io:38688',
    'streamscheme': [None],
    'streamuri': [None],
    'url': [None]
}
```
Another example which gets a connection to a remote.it device with a specific hostip. [Source code](examples/get-connection-to-device-for-hostip.py)