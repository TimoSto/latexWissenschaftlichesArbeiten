package main

import (
	"WA_LaTeX/src/packages/handlers"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/overview", handlers.HandleOverview)

	http.HandleFunc("/createProject", handlers.HandleNewProject)

	http.HandleFunc("/projects/", handlers.HandleGetProject)

	http.HandleFunc("/editType", handlers.HandleEditType)

	http.Handle("/", http.FileServer(http.Dir("./out")))

	log.Fatal( http.ListenAndServe(":8081", nil ) )
}