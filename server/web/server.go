package web

import (
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2"
	"io"
	"os"
	"strconv"
)

type Server struct {
	Engine          *gin.Engine
	Port            int
	DatabaseSession *mgo.Session
	Database        *mgo.Database
	IsReleaseMode   bool
	IsInsideDocker  bool
}

func NewServer(port int, mongoPort int, templatePath string, staticPath string) *Server {
	server := &Server{
		Port:           port,
		IsReleaseMode:  os.Getenv("GIN_MODE") == "release",
		IsInsideDocker: os.Getenv("INSIDE_DOCKER") == "true",
	}
	server.InitEngine(templatePath, staticPath)
	server.InitDatabase(mongoPort)
	return server
}

func (svr *Server) InitEngine(templatePath string, staticPath string) {
	if svr.IsReleaseMode {
		gin.SetMode(gin.ReleaseMode)
		gin.DisableConsoleColor()
		svr.logToFile()
	}
	svr.Engine = gin.Default()
	svr.Engine.LoadHTMLGlob(templatePath)
	svr.Engine.Static("/assets", staticPath)
	svr.RegisterRoutes()
}

func (svr *Server) logToFile() {
	os.Mkdir("log", os.ModePerm)
	var file *os.File
	file, err := os.OpenFile("log/gin.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0600)
	if err != nil {
		file, _ = os.Create("log/gin.log")
	}

	if svr.IsInsideDocker {
		gin.DefaultWriter = io.MultiWriter(os.Stdout, file)
	} else {
		gin.DefaultWriter = io.MultiWriter(file)
	}
}

func (svr *Server) InitDatabase(mongoPort int) {
	session, err := mgo.Dial("127.0.0.1:" + strconv.Itoa(mongoPort))
	if err != nil {
		panic(err)
	}
	svr.DatabaseSession = session
	svr.Database = session.DB("bar")
}

func (svr *Server) Run() {
	svr.Engine.Run(":" + strconv.Itoa(svr.Port))
}
