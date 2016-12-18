package server

import (
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
