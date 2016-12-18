package server

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Append struct {
	PostID    bson.ObjectId
	Text      string
	CreatedAt time.Time
}
