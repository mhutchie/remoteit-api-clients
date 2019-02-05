# Node.js client for remote.it API Integration

This is an API client for integrating with the remote.it API's in Node.js with no dependencies. It supports both JavaScript and TypeScript.

### Table of Contents
- [RemoteItApiClient Documentation:](#remoteitapiclient-documentation)
	- Class: RemoteItApiClient
        - [RemoteItApiClient(username, password, developerKey)](#remoteitapiclientusername-password-developerkey)
		- [client.listDevices(callback)](#clientlistdevicescallback)
		- [client.getConnectionToDevice(deviceAddress, options, callback)](#clientgetconnectiontodevicedeviceaddress-options-callback)
- [Download & Install](#download--install)
- [Usage Examples:](#usage-examples)
	- [Listing Devices](#listing-devices)
	- [Get Connection to a Device](#get-connection-to-a-device)

### RemoteItApiClient Documentation

#### RemoteItApiClient(username, password, developerKey)
- Create an instance of the RemoteItApiClient class
- Arguments:
	- username: your remote.it email (or for legacy users, your username)
	- password: your remote.it password
    - developerKey: your remote.it developer key ([you can get it here](https://app.remote.it/account.html "you can get it here"))

#### client.listDevices(callback)
- List all of your remote.it devices
- Arguments:
	- callback: a function accepting two arguments (error, devices). If `error` is null, then the request was successful and `devices` will contain an array of all your remote.it devices. If an error has occured, `error` is a string containing the reason.

#### client.getConnectionToDevice(deviceAddress, options, callback)
- Get a connection to a remote.it device
- Arguments:
	- deviceAddress: The service address of the device you'd like to connect to
	- options: An object containing optional arguments
		- wait: (Optional) Whether to wait for the connection or not
		- hostip: (Optional) The clients public IP address, which is used to enforce "IP restriction" upon making the connection. Defaults to the IP address of the the API caller if not provided.
	- callback: a function accepting two arguments (error, connection). If `error` is null, then the request was successful and `connection` will contain the connection details for the device. If an error has occured, `error` is a string containing the reason.

### Download & Install
1. Download the directory [remoteit](remoteit)
2. Save the downloaded remoteit directory into the ./node_modules directory of your project. (Create a ./node_modules directory if it doesn't already exist)
3. Import the module into your code by:
	- JavaScript: `const { RemoteItApiClient } = require('remoteit');`
	- TypeScript: `import { RemoteItApiClient } from "remoteit";`

### Usage Examples

#### Listing Devices
This example lists all of your remote.it devices. Source code: [\[js\]](examples-js/list-devices.js) [\[ts\]](examples-ts/list-devices.ts)
```javascript
const { RemoteItApiClient } = require('remoteit');

let client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

client.listDevices(function(error, devices){
    if(devices){
        console.log(devices)
    }else{
        console.log("Error: " + error);
    }
});
```
Output:
```json
[
    {
        "createdate": "2019-01-27T00:08:37.213-05:00",
        "deviceaddress": "80:00:00:00:01:00:01:25",
        "devicealias": "Example-Device",
        "devicetype": "00:1E:00:00:00:01:00:00:04:60:00:50:00:01:00:00",
        "devicestate": "active",
        "devicelastip": "126.237.116.49",
        "georegion": "Asia",
        "lastcontacted": "2019-01-28T17:57:49.467-05:00",
        "lastinternalip": "10.61.12.80",
        "localurl": "bm9uZQ==",
        "ownerusername": "test@example.com",
        "servicetitle": "Bulk Service",
        "shared": "not-shared",
        "webenabled": "1",
        "weburi": [ null ],
        "webviewerurl": [ null ]
    }
]
```

#### Get Connection to a Device
This example gets a connection to a remote.it device. Source code: [\[js\]](examples-js/get-connection-to-device.js) [\[ts\]](examples-ts/get-connection-to-device.ts)
```javascript
const { RemoteItApiClient } = require('remoteit');

let client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

client.getConnectionToDevice("<remote.it device address>", {}, function(error, connection){
    if(connection){
        console.log(connection);
    }else{
        console.log("Error: " + error);
    }
});
```
Output:
```json
{
    "deviceaddress": "80:00:00:00:00:00:00:F1",
    "expirationsec": "16880",
    "imageintervalms": "1000",
    "proxy": "http://proxy71.rt3.io:38688",
    "proxyport": "38688",
    "proxyserver": "proxy71.rt3.io",
    "requested": "1/28/2019T6:40 PM",
    "status": "http://proxy71.rt3.io:38688",
    "streamscheme": [ null ],
    "streamuri": [ null ],
    "url": [ null ]
}
```
Another example which gets a connection to a remote.it device with a specific hostip. Source code: [\[js\]](examples-js/get-connection-to-device-for-hostip.js) [\[ts\]](examples-ts/get-connection-to-device-for-hostip.ts)