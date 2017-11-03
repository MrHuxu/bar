package models

import (
	"gopkg.in/mgo.v2/bson"
)

type PostTagAssignment struct {
	ID     bson.ObjectId `bson:"_id,omitempty" json:"id"`
	PostID bson.ObjectId `bson:"post_id,omitempty" json:"postID"`
	TagID  bson.ObjectId `bson:"tag_id,omitempty" json:"tagID"`
}
