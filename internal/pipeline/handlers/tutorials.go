package handlers

import (
	"ThesorTeX/internal/tutorials"
	"net/http"
)

func HandleTutorials(w http.ResponseWriter, r *http.Request) {
	http.FileServer(http.FS(tutorials.Tutorials)).ServeHTTP(w, r)
}
