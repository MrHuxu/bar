package server

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Reply struct {
	PostID    bson.ObjectId
	Text      string
	ReplyTo   int
	CreatedAt time.Time
}
