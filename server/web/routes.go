package web

import (
	"github.com/MrHuxu/bar/server/web/handlers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (svr *Server) GenIndex() func(*gin.Context) {
	return func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"prd":   svr.IsReleaseMode,
			"title": "bar",
		})
	}
}

func (svr *Server) RegisterRoutes() {
	indexRoutes := svr.Engine.Group("/")
	{
		indexRoutes.GET("/", svr.GenIndex())
	}

	postRoutes := svr.Engine.Group("/post")
	{
		postRoutes.GET("/", func(c *gin.Context) { handlers.AllPosts(c, svr.Database) })
		postRoutes.POST("/create", func(c *gin.Context) { handlers.CreatePost(c, svr.Database) })
	}
}
