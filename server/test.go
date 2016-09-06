// +build test

package main

import (
	"fmt"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Post struct {
	ID      bson.ObjectId `bson:"_id,omitempty"`
	Title   string
	Appends *[]Append
	Replies *[]Reply
}

type Append struct {
	PostID    bson.ObjectId `bson:"_id,omitempty"`
	Content   string
	CreatedAt time.Time
}

type Reply struct {
	PostID    bson.ObjectId `bson:"_id,omitempty"`
	Content   string
	ReplyTo   int
	CreatedAt time.Time
}

func main() {

	session, err := mgo.Dial("127.0.0.1:27017")
	if err != nil {
		panic(err)
	}

	defer session.Close()

	// Collection People
	post := session.DB("bar").C("post")
	append := session.DB("bar").C("append")
	reply := session.DB("bar").C("reply")

	err = post.Insert(&Post{Title: "test"})

	var result Post
	err = post.Find(bson.M{"title": "test"}).One(&result)
	fmt.Println(result)

	fmt.Println(post, append, reply)
}
