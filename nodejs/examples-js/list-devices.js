const { RemoteItApiClient } = require('../remoteit');

let client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

client.listDevices(function(error, devices){
	if(devices){
		console.log(devices)
	}else{
		console.log("Error: " + error);
	}
});