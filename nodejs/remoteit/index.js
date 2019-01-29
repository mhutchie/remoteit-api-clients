"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
class RemoteItApiClient {
    constructor(username, password, developerKey) {
        this.username = username;
        this.password = password;
        this.developerKey = developerKey;
        this.token = "";
        this.tokenExpiration = 0;
        this.userAgent = "RemoteIt-API-Client-JS";
    }
    listDevices(callback) {
        let that = this;
        this.getAuthToken(function (error, token) {
            if (error) {
                callback(error, null);
                return;
            }
            that.makeApiRequest({ host: "api.remot3.it", path: "/apv/v27/device/list/all", headers: that.getApiHeaders(token) }, null, function (data) {
                callback(null, data.devices);
            }, callback);
        });
    }
    getConnectionToDevice(deviceAddress, options, callback) {
        let that = this;
        this.getAuthToken(function (error, token) {
            if (error) {
                callback(error, null);
                return;
            }
            let requestData = {
                deviceaddress: deviceAddress,
                wait: typeof options.wait === "boolean" ? options.wait : true
            };
            if (typeof options.hostip === "string")
                requestData.hostip = options.hostip;
            that.makeApiRequest({ host: "api.remot3.it", path: "/apv/v27/device/connect", method: "POST", headers: that.getApiHeaders(token) }, requestData, function (data) {
                callback(null, data.connection);
            }, callback);
        });
    }
    getAuthToken(callback) {
        if (this.tokenExpiration > (new Date()).getTime() / 1000) {
            callback(null, this.token);
            return;
        }
        let that = this;
        let requestData = {
            username: this.username,
            password: this.password
        };
        this.makeApiRequest({ host: "api.remot3.it", path: "/apv/v27/user/login", method: "POST", headers: { "developerkey": this.developerKey, "User-Agent": this.userAgent } }, requestData, function (data) {
            that.token = data.auth_token;
            that.tokenExpiration = data.auth_expiration;
            callback(null, data.auth_token);
        }, callback);
    }
    getApiHeaders(token) {
        return {
            "developerkey": this.developerKey,
            "token": token,
            "User-Agent": this.userAgent
        };
    }
    makeApiRequest(options, data, success, callback) {
        let req = https_1.request(options, function (res) {
            let data = "";
            res.on("data", function (chunk) { data += chunk; });
            res.on("end", function () {
                let responseData = JSON.parse(data);
                if (res.statusCode == 200) {
                    success(responseData);
                }
                else {
                    callback(responseData.reason, null);
                }
            });
            res.on("error", function (error) {
                callback(error.name + ": " + error.message, null);
            });
        });
        if (data !== null) {
            req.end(JSON.stringify(data));
        }
        else {
            req.end();
        }
    }
}
exports.RemoteItApiClient = RemoteItApiClient;
