package handlers

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

type ProjectHTMLDto struct {
	ProjectName string
}

func HandleGetProject(w http.ResponseWriter,r *http.Request) {

	tmpl, err := template.ParseFiles("./out/project.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	name := strings.Split(r.URL.Path, "/projects/")[1]

	data := ProjectHTMLDto{
		ProjectName: name,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}