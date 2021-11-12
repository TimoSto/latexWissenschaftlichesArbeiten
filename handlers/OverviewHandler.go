package handlers

import (
	"WA_LaTeX/convertBibToCSV"
	"WA_LaTeX/domain"
	"fmt"
	"html/template"
	"net/http"
)

type OverviewHTMLDto struct {
	Types []domain.LiteratureType
	Entries []convertBibToCSV.BibEntry
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

	data := OverviewHTMLDto{
		Types:   types.Types,
		Entries: convertBibToCSV.ReadBibEntries(),
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}