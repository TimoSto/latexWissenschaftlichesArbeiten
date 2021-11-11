package handlers

import (
	"WA_LaTeX/domain"
	"fmt"
	"html/template"
	"net/http"
)

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

	err = tmpl.Execute(w, types)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}