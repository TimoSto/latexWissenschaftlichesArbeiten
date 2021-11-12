package handlers

import (
	"WA_LaTeX/domain"
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

type EntryHTMLDto struct {
	Entry domain.BibEntry
	Types []domain.LiteratureType
}

func HandleEntry(w http.ResponseWriter, r *http.Request) {
	reqType := strings.Split(r.URL.Path, "/entry/")[1]

	entry := domain.BibEntry{}
	entries := domain.ReadBibEntries()
	for i:=0 ; i<len(entries);i++ {
		if strings.Compare(entries[i].Key, reqType) == 0 {
			entry = entries[i]
			break
		}
	}

	tmpl, err := template.ParseFiles("./out/entry.html")
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

	data := EntryHTMLDto{
		Entry: entry,
		Types: types.Types,
	}
	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}