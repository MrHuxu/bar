package server

type Reply struct {
	PostID    bson.ObjectId
	Text      string
	ReplyTo   int
	CreatedAt time.Time
}
