package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type EntryHTMLDto struct {
	Types []domain.LiteratureType
	Entry domain.BibEntry
	Type domain.LiteratureType
}

func HandleEditEntry(w http.ResponseWriter,r *http.Request) {

	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	tmpl, err := template.ParseFiles("./out/editEntry.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	types, err := domain.ReadTypes(project)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	entry := domain.BibEntry{}

	entrykeys, ok := r.URL.Query()["entry"]

	if ok && len(entrykeys[0]) > 0 {
		//Read entry
		entries, err := domain.ReadBibEntries(project)
		if err != nil {
			fmt.Println( err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		for i:=0 ; i<len(entries);i++ {
			if entries[i].Key == entrykeys[0] {
				entry = entries[i]
				break
			}
		}
	}

	thisType, err := domain.GetType(project, entry.Typ)

	data := EntryHTMLDto{
		Types: types.Types,
		Entry: entry,
		Type: thisType,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}