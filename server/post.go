package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
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

func (Post) LoadPosts(db *mgo.Database, posts *[]*Post) {
	postCollection := db.C("post")

	err := postCollection.Find(bson.M{}).All(posts)
	if err != nil {
		fmt.Println(err)
	}
}

func (p *Post) LoadAppends(db *mgo.Database) {
	appendCollection := db.C("append")

	p.Appends = &[]Append{}
	err := appendCollection.Find(bson.M{"postid": p.ID}).All(p.Appends)
	if err != nil {
		fmt.Println(err)
	}
}

func (p *Post) LoadReplies(db *mgo.Database) {
	replyCollection := db.C("reply")

	p.Replies = &[]Reply{}
	err := replyCollection.Find(bson.M{"postid": p.ID}).All(p.Replies)
	if err != nil {
		fmt.Println(err)
	}
}

func getAllPosts(c *gin.Context, db *mgo.Database) {
	var posts []*Post
	Post{}.LoadPosts(db, &posts)
	for index := range posts {
		posts[index].LoadAppends(db)
		posts[index].LoadReplies(db)
	}

	c.JSON(200, gin.H{
		"result": "success",
		"posts":  &posts,
	})
}

func createPost(c *gin.Context, db *mgo.Database) {
	var newPost Post
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&newPost)
	if err != nil {
		fmt.Println(err)
	}
	newPost.ID = bson.NewObjectId()
	newPost.CreatedAt = time.Now()

	post := db.C("post")
	err = post.Insert(&newPost)
	if err != nil {
		fmt.Println(err)
	}

	c.JSON(200, gin.H{
		"result":  "success",
		"newPost": &newPost,
	})
}
