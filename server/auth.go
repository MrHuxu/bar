package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"math/rand"
	"strings"
)

type Question struct {
	Label  string `json:"label"`
	Answer string `json:"answer"`
}

func (Question) LoadQuestions(file string) []Question {
	raw, err := ioutil.ReadFile(file)
	if err != nil {
		fmt.Println(err)
	}
	var questions []Question
	json.Unmarshal(raw, &questions)
	return questions
}

func fetchQuestion(c *gin.Context, questions map[string]string) {
	labels := []string{}
	for label := range questions {
		labels = append(labels, label)
	}
	count := len(labels)

	c.JSON(200, gin.H{
		"result": "success",
		"label":  labels[rand.Int()%count],
	})
}

func answerQuestion(c *gin.Context, questions map[string]string) {
	label := c.Query("label")
	answer := c.Query("answer")

	c.JSON(200, gin.H{
		"result": "success",
		"valid":  questions[label] == strings.ToLower(answer),
	})
}
