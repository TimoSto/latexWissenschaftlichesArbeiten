package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

type ProjectHTMLDto struct {
	ProjectName string
	LiteratureTypes domain.LiteratureTypes
	BibEntries []domain.BibEntry
}

func HandleGetProject(w http.ResponseWriter,r *http.Request) {

	tmpl, err := template.ParseFiles("./out/project.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	name := strings.Split(r.URL.Path, "/projects/")[1]

	literatureTypes, err := domain.ReadTypes(name)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	bib, err := domain.ReadBibEntries(name)

	data := ProjectHTMLDto{
		ProjectName: name,
		LiteratureTypes: literatureTypes,
		BibEntries: bib,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}