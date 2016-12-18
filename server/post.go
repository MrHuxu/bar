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

func (Post) Create(db *mgo.Database, post *Post) {
	postCollection := db.C("post")

	err := postCollection.Insert(post)
	if err != nil {
		fmt.Println(err)
	}
}

func (Post) Read(db *mgo.Database, posts *[]*Post) {
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

func allPosts(c *gin.Context, db *mgo.Database) {
	var posts []*Post
	Post{}.Read(db, &posts)
	for index := range posts {
		posts[index].LoadAppends(db)
		posts[index].LoadReplies(db)
	}

	c.JSON(200, gin.H{
		"result": "success",
		"posts":  &posts,
	})
}

func newPost(c *gin.Context, db *mgo.Database) {
	var post Post
	decoder := json.NewDecoder(c.Request.Body)
	err := decoder.Decode(&post)
	if err != nil {
		fmt.Println(err)
	}
	post.ID = bson.NewObjectId()
	post.CreatedAt = time.Now()

	Post{}.Create(db, &post)

	c.JSON(200, gin.H{
		"result":  "success",
		"newPost": &post,
	})
}
