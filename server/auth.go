package server

import (
	"github.com/gin-gonic/gin"
	"math/rand"
)

type Question struct {
	Label  string `json:"label"`
	Answer string `json:"answer"`
}

func fetchQuestion(c *gin.Context, questions map[string]string) {
	labels := []string{}
	for label := range questions {
		labels = append(labels, label)
	}
	count := len(labels)

	c.JSON(200, gin.H{
		"label": labels[rand.Int()%count],
	})
}

func answerQuestion(c *gin.Context, questions map[string]string) {

}
