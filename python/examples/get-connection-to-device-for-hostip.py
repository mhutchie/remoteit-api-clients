from remoteit import RemoteItApiClient

client = RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>")

print(client.get_connection_to_device("<remote.it device address>", hostip="<ip address of client>"))
