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

	postRoutes := svr.Engine.Group("/post")
	{
		postRoutes.GET("/", func(c *gin.Context) { allPosts(c, svr.DB) })
		postRoutes.POST("/create", func(c *gin.Context) { newPost(c, svr.DB) })
		postRoutes.POST("/append", func(c *gin.Context) { appendPost(c, svr.DB) })
		postRoutes.POST("/reply", func(c *gin.Context) { replyPost(c, svr.DB) })
	}

	authRoutes := svr.Engine.Group("/auth")
	{
		authRoutes.GET("/question", func(c *gin.Context) { fetchQuestion(c, svr.Questions) })
		authRoutes.GET("/answer", func(c *gin.Context) { answerQuestion(c, svr.Questions) })
	}
}
