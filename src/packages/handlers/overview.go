package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type OverviewHTMLDto struct {
	Projects []string
}

func HandleOverview(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./out/index.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	projects, err := domain.GetProjects()
	if err != nil {
		log.Fatal(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	data := OverviewHTMLDto{
		Projects: projects,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}