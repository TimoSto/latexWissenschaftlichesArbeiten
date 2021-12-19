package handlers

import (
	"WA_LaTeX/domain"
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

type ProjectHTMLDto struct {
	ProjectName string
	Entries []domain.BibEntry
}

func HandleProject(w http.ResponseWriter,r *http.Request) {

	project := strings.Split(r.URL.Path, "/project/")[1]

	entries := domain.ReadBibEntries(project)

	data := ProjectHTMLDto{
		ProjectName: project,
		Entries:     entries,
	}

	tmpl, err := template.ParseFiles("./out/project.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}