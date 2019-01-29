export declare class RemoteItApiClient {
    private username;
    private password;
    private developerKey;
    private token;
    private tokenExpiration;
    private userAgent;
    constructor(username: string, password: string, developerKey: string);
    listDevices(callback: (error: ApiError, devices: DeviceInformation[] | null) => void): void;
    getConnectionToDevice(deviceAddress: string, options: DeviceConnectionOptions, callback: (error: ApiError, connection: DeviceConnectionInformation | null) => void): void;
    private getAuthToken;
    private getApiHeaders;
    private makeApiRequest;
}
declare type ApiError = string | null;
declare type DeviceConnectionInformation = {
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
declare type DeviceConnectionOptions = {
    wait?: boolean;
    hostip?: string;
};
declare type DeviceInformation = {
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
export {};
