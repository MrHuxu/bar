package handlers

import (
	"encoding/json"
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
	collection := db.C("post")

	var rawBody []byte
	_, err := c.Request.Body.Read(rawBody)
	if err != nil {
		panic(err)
	}

	var post models.Post
	json.Unmarshal(rawBody, &post)
	err = collection.Insert(post)
	if err != nil {
		panic(err)
	}
}
