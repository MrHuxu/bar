package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Reply struct {
	PostID    bson.ObjectId
	Text      string
	ReplyTo   int
	CreatedAt time.Time
}

func replyPost(c *gin.Context, db *mgo.Database) {
	var newReply Reply
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&newReply)
	if err != nil {
		fmt.Println(err)
	}
	newReply.CreatedAt = time.Now()

	reply := db.C("reply")
	err = reply.Insert(&newReply)
	if err != nil {
		fmt.Println(err)
	}

	c.JSON(200, gin.H{
		"result":   "success",
		"newReply": &newReply,
	})
}
