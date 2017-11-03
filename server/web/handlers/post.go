package handlers

import (
	"github.com/MrHuxu/bar/server/web/models"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func AllPosts(c *gin.Context, db *mgo.Database) {
	collection := db.C("post")
	var posts []*models.Post

	err := collection.Find(bson.M{}).All(&posts)
	if err != nil {
		panic(err)
	}
	for _, post := range posts {
		post.LoadTags(db)
	}

	c.JSON(200, gin.H{
		"posts": posts,
	})
}

func CreatePost(c *gin.Context, db *mgo.Database) {

}
