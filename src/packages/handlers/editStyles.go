package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func HandleEditStyles(w http.ResponseWriter, r *http.Request) {

	file, err := GetHTMLFile("editStyles")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl, err := template.New("editStyles").Parse(file)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}