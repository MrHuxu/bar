package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func SetRoutes(svr *Server) {
	svr.Engine.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"prd":   "Production" == svr.Mode,
			"title": "Bar of xhu",
		})
	})
}
