package server

type Append struct {
	PostID    bson.ObjectId
	Text      string
	CreatedAt time.Time
}
