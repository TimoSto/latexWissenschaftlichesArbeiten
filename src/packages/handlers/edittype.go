package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type EditTypeHTMLDto struct {
	Project string
	Type domain.LiteratureType
}

func HandleEditType(w http.ResponseWriter,r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	data := EditTypeHTMLDto{
		Project: project,
	}

	typekeys, ok := r.URL.Query()["type"]

	if ok && len(typekeys[0]) > 0 {
		//FILL FIELDS
	}

	tmpl, err := template.ParseFiles("./out/editType.html")
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