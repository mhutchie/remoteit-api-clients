import { request, RequestOptions } from "https";

export class RemoteItApiClient{
	private username: string;
	private password: string;
	private developerKey: string;
	private token: string;
	private tokenExpiration: number;
	private userAgent: string;

	constructor(username:string, password:string, developerKey:string){
		this.username = username;
		this.password = password;
		this.developerKey = developerKey;
		this.token = "";
		this.tokenExpiration = 0;
		this.userAgent = "RemoteIt-API-Client-JS"
	}

	public listDevices(callback: (error: ApiError, devices: DeviceInformation[] | null) => void){
		let that = this;
		this.getAuthToken(function(error, token){
			if(error){
				callback(error, null);
				return;
			}

			that.makeApiRequest({host: "api.remot3.it", path: "/apv/v27/device/list/all", headers: that.getApiHeaders(token)}, null, function(data){
				callback(null, data.devices);
			}, callback);
		});
	}

	public getConnectionToDevice(deviceAddress: string, options: DeviceConnectionOptions, callback: (error: ApiError, connection: DeviceConnectionInformation | null) => void){
		let that = this;
		this.getAuthToken(function(error, token){
			if(error){
				callback(error, null);
				return;
			}

			let requestData:DeviceConnectionRequestData = {
				deviceaddress: deviceAddress,
				wait: typeof options.wait === "boolean" ? options.wait : true
			};
			if(typeof options.hostip === "string") requestData.hostip = options.hostip;

			that.makeApiRequest({host: "api.remot3.it", path: "/apv/v27/device/connect", method: "POST", headers: that.getApiHeaders(token)}, requestData, function(data){
				callback(null, data.connection);
			}, callback);
		})
	}

	private getAuthToken(callback: (error: ApiError, token: string) => void){
		if(this.tokenExpiration > (new Date()).getTime()/1000){
			callback(null, this.token);
			return;
		}

		let that = this;
		let requestData = {
			username: this.username,
			password: this.password
		};
		this.makeApiRequest({host: "api.remot3.it", path: "/apv/v27/user/login", method: "POST", headers: {"developerkey": this.developerKey, "User-Agent": this.userAgent}}, requestData, function(data){
			that.token = data.auth_token;
			that.tokenExpiration = data.auth_expiration;
			callback(null, data.auth_token);
		}, callback);
	}

	private getApiHeaders(token: string){
		return {
			"developerkey": this.developerKey,
			"token": token,
			"User-Agent": this.userAgent
		}
	}

	private makeApiRequest(options: RequestOptions, data: any, success: (data: any) => void, callback: (error: ApiError, data: any) => void){
		let req = request(options, function(res){
			let data = "";
			res.on("data", function(chunk){ data += chunk; });
			res.on("end", function(){
				let responseData = JSON.parse(data);
				if(res.statusCode == 200){
					success(responseData);
				}else{
					callback(responseData.reason, null);
				}
			});
			res.on("error", function(error){
				callback(error.name+": "+error.message, null);
			});
		});
		if(data !== null){
			req.end(JSON.stringify(data));
		}else{
			req.end();
		}
	}
}

type ApiError = string | null;

type DeviceConnectionInformation = {
	deviceaddress: string;
	expirationsec: string;
	imageintervalms: string;
	proxy: string;
	proxyport: string;
	proxyserver: string;
	requested: string;
	status: string;
	streamscheme: any;
	streamuri: any;
	url: any;
};

type DeviceConnectionOptions = {
	wait?: boolean;
	hostip?: string;
};

type DeviceConnectionRequestData = {
	deviceaddress: string;
	wait?: boolean;
	hostip?: string;
};

type DeviceInformation = {
	createdate: string;
	deviceaddress: string;
	devicealias: string;
	devicetype: string;
	devicestate: string;
	devicelastip: string;
	georegion: string;
	lastcontacted: string;
	lastinternalip: string;
	localurl: string;
	ownerusername: string;
	servicetitle: string;
	shared: string;
	webenabled: string;
	weburi: any;
	webviewerurl: any;
};
