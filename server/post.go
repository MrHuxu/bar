package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Post struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	Title     string
	Content   string
	CreatedAt time.Time
	Appends   *[]Append
	Replies   *[]Reply
}

func getAllPosts(c *gin.Context, db *mgo.Database) {
	postCollection := db.C("post")
	appendCollection := db.C("append")
	replyCollection := db.C("reply")

	var posts []Post
	err := postCollection.Find(bson.M{}).All(&posts)
	if err != nil {
		fmt.Println(err)
	}

	for index := range posts {
		var appends []Append
		err = appendCollection.Find(bson.M{"postid": posts[index].ID}).All(&appends)
		if err != nil {
			fmt.Println(err)
		}
		posts[index].Appends = &appends

		var replies []Reply
		err = replyCollection.Find(bson.M{"postid": posts[index].ID}).All(&replies)
		if err != nil {
			fmt.Println(err)
		}
		posts[index].Replies = &replies
	}

	c.JSON(200, gin.H{
		"result": "success",
		"posts":  &posts,
	})
}

func createPost(c *gin.Context, db *mgo.Database) {
	var newPost Post
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&newPost)
	if err != nil {
		fmt.Println(err)
	}
	newPost.ID = bson.NewObjectId()
	newPost.CreatedAt = time.Now()

	post := db.C("post")
	err = post.Insert(&newPost)
	if err != nil {
		fmt.Println(err)
	}

	c.JSON(200, gin.H{
		"result":  "success",
		"newPost": &newPost,
	})
}
