<?php

class RemoteItApiClient{
	private $username;
	private $password;
	private $developerKey;
	private $token;
	private $tokenExpiration;
	private $userAgent;

	public function __construct($username, $password, $developerKey) {
		$this->username = $username;
		$this->password = $password;
		$this->developerKey = $developerKey;
		$this->token = "";
		$this->tokenExpiration = 0;
		$this->userAgent = "RemoteIt-API-Client-PHP";
	}

	public function listDevices(){
		$responseData = $this->makeApiRequest("https://api.remot3.it/apv/v27/device/list/all", $this->getApiHeaders(), null);
		return $responseData->devices;
	}

	public function getConnectionToDevice($deviceAddress, $options = null){
		$requestData = array(
			"deviceaddress" => $deviceAddress,
			"wait" => $options != null && array_key_exists("wait", $options) ? $options["wait"] : true
		);
		if($options != null && array_key_exists("hostip", $options)) $requestData["hostip"] = $options["hostip"];

		$responseData = $this->makeApiRequest("https://api.remot3.it/apv/v27/device/connect", $this->getApiHeaders(), $requestData);
		return $responseData->connection;
	}

	private function getAuthToken(){
		if($this->tokenExpiration > time()){
			return $this->token;
		}

		$headers = array(
			"developerkey: ".$this->developerKey,
			"User-Agent: ".$this->userAgent
		);
		$requestData = array(
			"username" => $this->username,
			"password" => $this->password
		);
		$responseData = $this->makeApiRequest("https://api.remot3.it/apv/v27/user/login", $headers, $requestData);
		
		$this->token = $responseData->auth_token;
		$this->tokenExpiration = $responseData->auth_expiration;
		return $responseData->auth_token;
	}

	private function getApiHeaders(){
		return array(
			"developerkey: ".$this->developerKey,
			"token: ".$this->getAuthToken(),
			"User-Agent: ".$this->userAgent
		);
	}

	private function makeApiRequest($url, $headers, $data){
		$ch = curl_init();
		curl_setopt_array($ch, array(
			CURLOPT_URL => $url,
			CURLOPT_HTTPHEADER => $headers,
			CURLOPT_RETURNTRANSFER => true
		));
		if($data != null){
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
		}
		$response = curl_exec($ch);
		$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);

		$responseData = json_decode($response);
		if($statusCode == "200"){
			return $responseData;
		}else{
			throw new Exception($responseData->reason);
		}
	}
}
?>