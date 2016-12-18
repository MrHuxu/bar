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

func (Reply) Create(db *mgo.Database, reply *Reply) {
	replyCollection := db.C("reply")

	err := replyCollection.Insert(reply)
	if err != nil {
		fmt.Println(err)
	}
}

func replyPost(c *gin.Context, db *mgo.Database) {
	var reply Reply
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&reply)
	if err != nil {
		fmt.Println(err)
	}
	reply.CreatedAt = time.Now()

	Reply{}.Create(db, &reply)

	c.JSON(200, gin.H{
		"result":   "success",
		"newReply": &reply,
	})
}
