package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"io"
	"io/ioutil"
	"os"
	"strconv"
)

type Server struct {
	Port      string
	Engine    *gin.Engine
	Mode      string
	DBPort    string
	DB        *mgo.Database
	Questions map[string]string
}

func NewServer() *Server {
	svr := &Server{}
	return svr
}

func (svr *Server) InitQuestions(file string) {
	raw, err := ioutil.ReadFile(file)
	if err != nil {
		fmt.Println(err)
	}
	var questions []Question
	json.Unmarshal(raw, &questions)

	svr.Questions = make(map[string]string)
	for _, question := range questions {
		svr.Questions[question.Label] = question.Answer
	}
}

func (svr *Server) InitEngine(mode string) {
	svr.Mode = mode
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
	logFile, err := os.OpenFile("server/logfile.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		fmt.Println("error opening log file")
	}
	defer logFile.Close()

	gin.DefaultWriter = io.Writer(logFile)
	gin.SetMode(gin.ReleaseMode)

	svr.Engine = gin.New()
	svr.Engine.Use(gin.Logger())
	svr.Engine.StaticFile("./bundle.js", "server/built/bundle.js")
}

func (svr *Server) InitTemplateConfig(dir string) {
	svr.Engine.LoadHTMLGlob(dir)
}

func (svr *Server) InitDatabaseConfig(dbPort int) {
	svr.DBPort = strconv.Itoa(dbPort)
	session, err := mgo.Dial("127.0.0.1:" + svr.DBPort)
	if err != nil {
		panic(err)
	}
	svr.DB = session.DB("bar")
}

func (svr *Server) Run(port int) {
	svr.Port = strconv.Itoa(port)
	fmt.Println("==> 🌎  Listening on port " + svr.Port + ". Open up http://localhost:8081/ in your browser.")
	svr.Engine.Run(":" + svr.Port)
}
