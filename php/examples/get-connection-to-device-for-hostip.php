<?php

require "../remoteit/remoteit.php";

$client = new RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>");

print_r($client->getConnectionToDevice("<remote.it device address>", array("hostip" => "<ip address of client>")));

?>