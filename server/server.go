package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"io"
	"os"
	"strconv"
)

type Server struct {
	Engine *gin.Engine
	Mode   string
	Port   string
	DBPort string
	DB     *mgo.Database
}

func NewServer(mode string, port int) *Server {
	svr := &Server{
		Mode: mode,
		Port: strconv.Itoa(port),
	}

	svr.initEngine()
	svr.initTemplateConfig()
	svr.initDatabaseConfig()

	setRoutes(svr)

	return svr
}

func (svr *Server) initEngine() {
	if svr.Mode == "Production" {
		svr.initEngineOnPrdMode()
	} else {
		svr.initEngineOnDevMode()
	}
}

func (svr *Server) initEngineOnDevMode() {
	gin.SetMode(gin.DebugMode)
	svr.Engine = gin.New()
}

func (svr *Server) initEngineOnPrdMode() {
	logFile, err := os.OpenFile("logfile.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("error opening log file")
	}
	defer logFile.Close()

	gin.DefaultWriter = io.Writer(logFile)
	gin.SetMode(gin.ReleaseMode)

	svr.Engine = gin.New()
	svr.Engine.Use(gin.Logger())
	svr.Engine.StaticFile("./bundle.js", "./built/bundle.js")
}

func (svr *Server) initTemplateConfig() {
	svr.Engine.LoadHTMLGlob("server/templates/*")
}

func (svr *Server) initDatabaseConfig() {
	session, err := mgo.Dial("127.0.0.1:27017")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	svr.DB = session.DB("bar")
}

func (svr *Server) Run() {
	fmt.Println("==> 🌎  Listening on port 8081. Open up http://localhost:8081/ in your browser.")
	svr.Engine.Run(":" + svr.Port)
}
