package handlers

import (
	"github.com/MrHuxu/bar/server/web/models"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func AllTags(c *gin.Context, db *mgo.Database) {
	collection := db.C("tag")
	var tags []*models.Tag

	err := collection.Find(bson.M{}).All(&tags)
	if err != nil {
		panic(err)
	}

	c.JSON(200, gin.H{
		"tags": tags,
	})
}

func CreateTag(c *gin.Context, db *mgo.Database) {

}
