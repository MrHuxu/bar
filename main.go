package main

import (
	"github.com/MrHuxu/bar/server/web"
)

var TEMPLATE_PATH = "server/web/templates/*"
var STATIC_PATH = "server/public"
var PORT = 13109
var MONGO_PORT = 27017

func main() {
	barServer := web.NewServer(PORT, MONGO_PORT, TEMPLATE_PATH, STATIC_PATH)
	defer barServer.DatabaseSession.Close()

	barServer.Run()
}
