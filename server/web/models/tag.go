package models

import (
	"gopkg.in/mgo.v2/bson"
)

type Tag struct {
	ID    bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Label string
}
