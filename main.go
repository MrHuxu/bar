package main

import (
	"github.com/MrHuxu/bar/server"
	"os"
)

var MODE = os.Getenv("ENV")
var PORT = 8081
var MONGO_PORT = 27017

func main() {
	barServer := server.NewServer()
	barServer.InitEngine(MODE)
	barServer.InitTemplateConfig("server/templates/*")
	barServer.InitDatabaseConfig(MONGO_PORT)
	server.SetRoutes(barServer)

	barServer.Run(PORT)
}
