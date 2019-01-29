import { RemoteItApiClient } from "../remoteit";

let client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

client.getConnectionToDevice("<remote.it device address>", {}, function(error, connection){
	if(connection){
		console.log(connection);
	}else{
		console.log("Error: " + error);
	}
});