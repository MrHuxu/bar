package models

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Tag struct {
	ID        bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Label     string
	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
}
