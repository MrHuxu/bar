package main

import (
	"github.com/MrHuxu/bar/server"
	"os"
)

func main() {
	mode := os.Getenv("ENV")

	server := server.NewServer(mode, 8081)
	server.Run()
}
