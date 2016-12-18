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

	// 	postRoutes := router.Group("/post")
	// 	{
	// 		postRoutes.GET("/", func(c *gin.Context) { getAllPosts(c, barDB) })
	// 		postRoutes.POST("/create", func(c *gin.Context) { createPost(c, barDB) })
	// 		postRoutes.POST("/append", func(c *gin.Context) { appendPost(c, barDB) })
	// 		postRoutes.POST("/reply", func(c *gin.Context) { replyPost(c, barDB) })
	// 	}

	postRoutes := svr.Engine.Group("/post")
	{
		postRoutes.GET("/", func(c *gin.Context) { getAllPosts(c, svr.DB) })
		postRoutes.POST("/create", func(c *gin.Context) { createPost(c, svr.DB) })
		postRoutes.POST("/append", func(c *gin.Context) { appendPost(c, svr.DB) })
		postRoutes.POST("/reply", func(c *gin.Context) { replyPost(c, svr.DB) })
	}
}
