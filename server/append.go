package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Append struct {
	PostID    bson.ObjectId
	Text      string
	CreatedAt time.Time
}

func (Append) Create(db *mgo.Database, append *Append) {
	appendCollection := db.C("append")

	err := appendCollection.Insert(append)
	if err != nil {
		fmt.Println(err)
	}
}

func appendPost(c *gin.Context, db *mgo.Database) {
	var append Append
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&append)
	if err != nil {
		fmt.Println(err)
	}
	append.CreatedAt = time.Now()

	Append{}.Create(db, &append)

	c.JSON(200, gin.H{
		"result":    "success",
		"newAppend": &append,
	})
}
