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

func appendPost(c *gin.Context, db *mgo.Database) {
	var newAppend Append
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&newAppend)
	if err != nil {
		fmt.Println(err)
	}
	newAppend.CreatedAt = time.Now()

	append := db.C("append")
	err = append.Insert(&newAppend)
	if err != nil {
		fmt.Println(err)
	}

	c.JSON(200, gin.H{
		"result":    "success",
		"newAppend": &newAppend,
	})
}
