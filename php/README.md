# PHP client for remote.it API Integration

This is an API client for integrating with the remote.it API's in PHP with no dependencies.

### Table of Contents
- [RemoteItApiClient Documentation:](#remoteitapiclient-documentation)
	- Class: RemoteItApiClient
        - [RemoteItApiClient(username, password, developerKey)](#remoteitapiclientusername-password-developerkey)
		- [client->listDevices()](#client-listdevices)
		- [client->getConnectionToDevice(deviceAddress, options)](#client-getconnectiontodevicedeviceaddress-options)
- [Download](remoteit)
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

#### client->listDevices()
- List all of your remote.it devices
- Output: An array of devices

#### client->getConnectionToDevice(deviceAddress, options)
- Get a connection to a remote.it device
- Arguments:
	- deviceAddress: The service address of the device you'd like to connect to
	- options: An associative array providing optional arguments
		- wait: (Optional) Whether to wait for the connection or not
		- hostip: (Optional) The clients public IP address, which is used to enforce "IP restriction" upon making the connection. Defaults to the IP address of the the API caller if not provided.
- Output: An object containing connection details.

### Usage Examples

#### Listing Devices
This example lists all of your remote.it devices. [Source code](examples/list-devices.php)
```php
<?php

require "../remoteit/remoteit.php";

$client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

print_r($client->listDevices());

?>
```
Output:
```
Array
(
    [0] => stdClass Object
        (
            [deviceaddress] => 80:00:00:00:01:00:01:25
            [devicealias] => Example-Device
            [ownerusername] => test@example.com
            [devicetype] => 00:1E:00:00:00:01:00:00:04:60:00:50:00:01:00:00
            [devicestate] => active
            [devicelastip] => 126.237.116.49
            [lastinternalip] => 10.61.12.80
            [servicetitle] => Bulk Service
            [webenabled] => 1
            [weburi] => Array
                (
                    [0] => 
                )
            [localurl] => bm9uZQ==
            [georegion] => Asia
            [webviewerurl] => Array
                (
                    [0] => 
                )
            [lastcontacted] => 2019-01-28T17:57:49.467-05:00
            [createdate] => 2019-01-27T00:08:37.213-05:00
            [shared] => not-shared
        )
)
```

#### Get Connection to a Device
This example gets a connection to a remote.it device. [Source code](examples/get-connection-to-device.php)
```php
<?php

require "../remoteit/remoteit.php";

$client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

print_r($client->getConnectionToDevice("<remote.it device address>"));

?>
```
Output:
```
stdClass Object
(
    [deviceaddress] => 80:00:00:00:00:00:00:F1
    [expirationsec] => 16880
    [imageintervalms] => 1000
    [proxy] => http://proxy71.rt3.io:38688
    [proxyport] => 38688
    [proxyserver] => proxy71.rt3.io
    [requested] => 1/28/2019T6:40 PM
    [status] => http://proxy71.rt3.io:38688
    [streamscheme] => Array
        (
            [0] => 
        )
    [streamuri] => Array
        (
            [0] => 
        )
    [url] => Array
        (
            [0] => 
        )
)
```
Another example which gets a connection to a remote.it device with a specific hostip. [Source code](examples/get-connection-to-device-for-hostip.php)