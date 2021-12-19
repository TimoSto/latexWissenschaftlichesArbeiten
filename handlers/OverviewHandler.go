package handlers

import (
	"WA_LaTeX/domain"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

type OverviewHTMLDto struct {
	Types []domain.LiteratureType
	Projects []string
}

func HandleOverview(w http.ResponseWriter,r *http.Request) {
	tmpl, err := template.ParseFiles("./out/overview.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	types, err := domain.ReadTypes()
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dirContent, err := ioutil.ReadDir("./projects/")
	if err != nil {
		log.Fatal(err)
	}

	var projects []string

	for _, f := range dirContent {
		if f.IsDir() {
			projects = append(projects, f.Name())
		}
	}

	data := OverviewHTMLDto{
		Types:   types.Types,
		Projects: projects,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}