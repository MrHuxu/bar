package models

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Post struct {
	ID        bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Title     string        `json:"title"`
	Content   string        `json:"content"`
	Score     int           `json:"score"`
	CreatedAt time.Time     `json:"createdAt"`

	Tags []*Tag `json:"tags"`
}

func (p *Post) LoadTags(db *mgo.Database) {
	assCollection := db.C("post_tag_assignment")
	tagCollection := db.C("tag")

	var assignments []*PostTagAssignment
	p.Tags = []*Tag{}

	err := assCollection.Find(bson.M{"post_id": p.ID}).All(&assignments)
	if err != nil {
		panic(err)
	}

	for _, ass := range assignments {
		var tag []*Tag
		err = tagCollection.FindId(ass.TagID).All(&tag)
		if err != nil {
			panic(err)
		}
		p.Tags = append(p.Tags, tag[0])
	}
}
