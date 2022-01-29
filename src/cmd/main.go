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

	http.HandleFunc("/saveType", handlers.HandleSaveType)

	http.HandleFunc("/deleteType", handlers.HandleDeleteType)

	http.HandleFunc("/editEntry", handlers.HandleEditEntry)

	http.HandleFunc("/typeFields/", handlers.HandleTypeFields)

	http.HandleFunc("/saveEntry", handlers.HandleSaveEntry)

	http.HandleFunc("/deleteEntry", handlers.HandleDeleteEntry)

	http.HandleFunc("/deleteProject", handlers.HandleDeleteProject)

	http.Handle("/", http.FileServer(http.Dir("./out")))

	log.Fatal( http.ListenAndServe(":8081", nil ) )
}