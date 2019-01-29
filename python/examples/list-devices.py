from remoteit import RemoteItApiClient

client = RemoteItApiClient("<remote.it username>", "<remote.it password>", "<remote.it developer key>")

print(client.list_devices())
